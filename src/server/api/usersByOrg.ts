import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';
import {getUsersByOrgId} from '../queries';

export const usersByOrg = new Router();
const route = '/api/v1/usersByOrg';
const table = 'accounts_roles';
const state = 'state.locals.data';

usersByOrg.get(route, async (ctx: Koa.ParameterizedContext) => {
  const orgId = _.get(ctx, `${state}.id`, 0);
  ctx.body = await getUsersByOrgId(ctx, orgId);
});

usersByOrg.post(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, state, {});
  const userId = _.get(ctx, 'state.user.id', 0);
  const {id: orgId} = data;

  if (userId === 0) {
    return ctx.redirect('/signup');
  }

  const accountId = await knex('accounts').limit(1).where({userId}).first();

  // insert new user into db
  try {
    await knex(table)
      .insert({accountId, orgId, userId, role: 'member'})
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

  let updatedAccountRoleRel: tAccountRoleRelation[];
  try {
    updatedAccountRoleRel = await knex(table)
      .limit(1)
      .where({orgId, userId})
      .update({role})
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = updatedAccountRoleRel[0];
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
