import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';
import {getUsersByOrgId} from '../queries';

export const usersByOrg = new Router();
const route = '/api/v1/usersByOrg';
const table = 'users_orgs';
const state = 'state.locals.data';

usersByOrg.get(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, state, {});
  const {id: orgId} = data;
  ctx.body = await getUsersByOrgId(ctx, orgId);
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

usersByOrg.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {orgId, role, userId} = _.get(ctx, state, {});

  let updatedUserOrgRel: tUserOrgRelation[];
  try {
    updatedUserOrgRel = await knex(table)
      .limit(1)
      .where({orgId, userId})
      .update({role})
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = updatedUserOrgRel[0];
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
