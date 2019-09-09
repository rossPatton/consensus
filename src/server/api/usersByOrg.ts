import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {notNull} from '../../utils';
import {knex} from '../db/connection';

export const usersByOrg = new Router();
const route = '/api/v1/usersByOrg';
const table = 'users_orgs';

const getUsers = async (ctx: Koa.ParameterizedContext, mappedIds: number[]) => {
  const {query}: tIdQueryServer = ctx;
  const {limit, offset} = query;

  const parsedLimit = limit ? parseInt(limit, 10) : 0;
  const parsedOffset = offset ? parseInt(offset, 10) : 0;

  const users = knex('users').whereIn('id', mappedIds);

  if (parsedLimit > 0) users.limit(parsedLimit);
  if (parsedOffset > 0) users.offset(parsedOffset);

  return users;
};

usersByOrg.get(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, 'state.locals.data', {});
  const {id: orgId} = data;

  let userOrgRels: tUserOrgRelation[];
  try {
    userOrgRels = await knex(table).where({orgId});
  } catch (err) {
    return ctx.throw(400, err);
  }

  // userIds here are ALL ids, but we limit by default to 10 at a time by default
  const mappedIds = userOrgRels.map(idSet => idSet.userId);

  // use the returned ids to query users table
  let users: tUser[];
  try {
    users = await getUsers(ctx, mappedIds);
  } catch (err) {
    return ctx.throw(400, err);
  }

  const usersWithRoles = users.map(user => {
    const idSet = _.find(userOrgRels, userOrgRel => user.id === userOrgRel.userId);

    if (!idSet) return null;

    return {
      ...user,
      role: idSet.role,
    };
  }).filter(notNull);

  const usersByOrg = {
    userTotal: mappedIds.length,
    users: usersWithRoles,
  };

  ctx.body = usersByOrg;
});

usersByOrg.post(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, 'state.locals.data', {});
  const userId = _.get(ctx, 'state.user.id', 0);
  const {id: orgId} = data;

  try {
    await knex(table)
      .insert({orgId, userId, role: 'member'})
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

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
  const userId = _.get(ctx, 'state.user.id', 0);
  const orgId = _.get(ctx, 'state.locals.data.id', {});

  try {
    await knex(table)
      .limit(1)
      .where({orgId, userId})
      .del();
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = {ok: true};
});
