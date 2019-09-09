import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {notNull} from '../../utils';
import {knex} from '../db/connection';

export const usersByOrg = new Router();
const route = '/api/v1/usersByOrg';
const table = 'users_orgs';
const state = 'state.locals.data';

usersByOrg.get(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, state, {});
  const {id: orgId} = data;

  const userOrgRelsStream = knex(table).where({orgId}).stream();
  const userOrgRels: tUserOrgRelation[] = [];
  try {
    for await (const chunk of userOrgRelsStream) {
      userOrgRels.push(chunk);
    }
  } catch (err) {
    return ctx.throw(400, err);
  }

  // userIds here are ALL ids, but we limit by default to 10 at a time by default
  let mappedIds: number[];
  try {
    mappedIds = await Promise.all(userOrgRels.map(async idSet => idSet.userId));
  } catch (err) {
    return ctx.throw(400, err);
  }

  // use the returned ids to query users table
  const usersStream = knex('users').whereIn('id', mappedIds).stream();
  const users: tUser[] = [];
  try {
    for await (const chunk of usersStream) {
      users.push(chunk);
    }
  } catch (err) {
    return ctx.throw(400, err);
  }

  const usersWithRoles = await Promise.all(users.map(async user => {
    const idSet = _.find(userOrgRels, userOrgRel => user.id === userOrgRel.userId);

    if (!idSet) return null;

    return {
      ...user,
      role: idSet.role,
    };
  }).filter(notNull));

  if (usersWithRoles instanceof Array && usersWithRoles.length === 0) {
    return ctx.throw(204);
  }

  ctx.body = {
    userTotal: mappedIds.length,
    users: usersWithRoles,
  };
});

usersByOrg.post(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, state, {});
  const userId = _.get(ctx, 'state.user.id', 0);
  const {id: orgId} = data;

  if (userId === 0) {
    ctx.throw(400, 'User needs to be logged in');
    return ctx.redirect('/signup');
  }

  // insert new user into db
  try {
    await knex(table)
      .insert({orgId, userId, role: 'member'})
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  // update usersByOrg redux state with latest from db
  let user: tUser;
  try {
    user = await knex('users')
      .limit(1)
      .where({id: userId})
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = user;
});

usersByOrg.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const {orgId, userId} = _.get(ctx, state, {});

  try {
    await knex(table)
      .limit(1)
      .where({orgId, userId})
      .del();
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = {ok: true, orgId, userId};
});
