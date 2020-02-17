import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {getSession} from '../../queries';
import {filterUserInfoFromClient, validateSchema} from '../../utils';
import {getUsersByOrgId} from './_queries';
import {deleteSchema, getSchema, patchSchema, postSchema} from './_schema';
import {tUserByOrgQuery} from './_types';

export const usersByOrgId = new Router();
const route = '/api/v1/usersByOrgId';
const table = 'accounts_roles';
const dataPath = 'state.locals.data';

// api for interacting with the accounts_roles table
// not for signing up new users, but for getting users that are members of an org
// or joining an org, or updating member roles within an org

usersByOrgId.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tUsersByOrgIdQuery = _.get(ctx, dataPath, {});
  console.log('usersByOrgId query => ', query);

  await validateSchema<tUsersByOrgIdQuery>(ctx, getSchema, query);

  const users = await getUsersByOrgId(ctx, query);
  const cleanUsers = await filterUserInfoFromClient(users);
  ctx.body = cleanUsers;
});


// joining an org. uses session data since we don't want people to be able to
// add others to an org, only the logged-in user should be able to do that
usersByOrgId.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {orgId}: tUserByOrgQuery = _.get(ctx, dataPath, {});
  const {userId} = _.get(ctx, 'state.user', {});

  await validateSchema<tUserByOrgQuery>(ctx, postSchema, {orgId, userId});

  // 0 means the user isn't logged in basically
  if (userId === 0) return ctx.redirect('/signup');

  const {id: accountId}: tAccount = await knex('accounts')
    .limit(1)
    .where({userId})
    .first()
    .select('id');

  // insert new user into db
  try {
    await knex(table).insert({accountId, orgId, userId, role: 'member'});
  } catch (err) {
    return ctx.throw(400, err);
  }

  // TODO should probably simplify this or store in server state somehow
  // get authentication status + active session data
  const passport = await ctx.redis.get(ctx.session._sessCtx.externalKey);
  const session = await getSession(ctx, _.get(passport, 'passport.user', {}));
  ctx.body = _.get(session, 'data.profile', {});
});


usersByOrgId.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tPatchUserRoleQuery = _.get(ctx, dataPath, {});
  const {orgId, role, userId} = query;

  await validateSchema<tPatchUserRoleQuery>(ctx, patchSchema, {orgId, role, userId});

  let updatedAccountRoleRel: tAccountRoleRelation[] = [];
  try {
    updatedAccountRoleRel = await knex(table)
      .limit(1)
      .where({orgId, userId})
      .update({role})
      .returning(['orgId', 'role', 'userId']);
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = updatedAccountRoleRel[0];
});

usersByOrgId.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tUserByOrgQuery = _.get(ctx, dataPath, {});

  await validateSchema<tUserByOrgQuery>(ctx, deleteSchema, query);

  try {
    await knex(table)
      .limit(1)
      .where({orgId: query.orgId, userId: query.userId})
      .first()
      .del();
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = {userId: parseInt(query.userId, 10)};
});
