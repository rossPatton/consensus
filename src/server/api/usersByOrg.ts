import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';
import {getUsersByOrgId} from '../queries';

export const usersByOrg = new Router();
const route = '/api/v1/usersByOrg';
const table = 'accounts_roles';
const state = 'state.locals.data';

// api for interacting with the accounts_roles table
// not for signing up new users, but for getting users that are members of an org
// or joining an org, or updating member roles within an org

usersByOrg.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tIdQueryS = _.get(ctx, state, 0);
  const {id: orgId} = query;
  ctx.body = await getUsersByOrgId(ctx, orgId);
});

usersByOrg.post(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tIdQueryS = _.get(ctx, state, {});
  const session = _.get(ctx, 'state.user', {});
  const {id: orgId} = query;
  const {id: userId} = session;

  // 0 means the user isn't logged in basically
  if (userId === 0) return ctx.redirect('/signup');

  const account: tAccount = await knex('accounts')
    .limit(1)
    .where({userId})
    .first();

  // insert new user into db
  try {
    await knex(table)
      .insert({accountId: account.id, orgId, userId, role: 'member'})
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
  const query: tPatchUserRoleQuery = _.get(ctx, state, {});
  const {orgId, role, userId} = query;

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
  const query: tDeleteUserOrgQuery = _.get(ctx, state, {});
  const {orgId, userId} = query;

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
