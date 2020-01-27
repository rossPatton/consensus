import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {getSession} from '../../queries';
import {deleteSchema, getSchema, patchSchema, postSchema} from './_schema';
import {getUsersByOrgId} from './queries';

export const usersByOrg = new Router();
const route = '/api/v1/usersByOrg';
const table = 'accounts_roles';
const state = 'state.locals.data';
const errorPath = 'details[0].message';
const errorMsg = 'Bad Request';

// api for interacting with the accounts_roles table
// not for signing up new users, but for getting users that are members of an org
// or joining an org, or updating member roles within an org

usersByOrg.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tUsersByOrgIdQuery = _.get(ctx, state, {});

  try {
    await getSchema.validateAsync<tUsersByOrgIdQuery>(query);
  } catch (err) {
    const message = _.get(err, errorPath, errorMsg);
    return ctx.throw(400, message);
  }

  ctx.body = await getUsersByOrgId(ctx, query);
});


// joining an org. uses session data since we don't want people to be able to
// add others to an org, only the logged-in user should be able to do that
usersByOrg.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {orgId}: tUsersByOrgIdQuery = _.get(ctx, state, {});
  // state.user === account entry. password requires the key user
  const {userId} = _.get(ctx, 'state.user', {});

  try {
    await postSchema.validateAsync<tUsersByOrgIdQuery>({
      orgId,
      userId,
    });
  } catch (err) {
    const message = _.get(err, errorPath, errorMsg);
    return ctx.throw(400, message);
  }

  // 0 means the user isn't logged in basically
  if (!userId || userId === 0) {
    return ctx.redirect('/signup');
  }

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

usersByOrg.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tPatchUserRoleQuery = _.get(ctx, state, {});
  const {orgId, role, userId} = query;

  try {
    await patchSchema.validateAsync<tPatchUserRoleQuery>({
      orgId,
      role,
      userId,
    });
  } catch (err) {
    const message = _.get(err, errorPath, errorMsg);
    return ctx.throw(400, message);
  }

  let updatedAccountRoleRel = {} as tAccountRoleRelation;
  try {
    updatedAccountRoleRel = await knex(table)
      .limit(1)
      .where({orgId, userId})
      .update({role})
      .returning(['orgId', 'role', 'userId'])
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = updatedAccountRoleRel;
});

usersByOrg.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...query} = _.get(ctx, state, {});

  try {
    await deleteSchema.validateAsync<tDeleteUserByOrgIdQuery>(query);
  } catch (err) {
    const message = _.get(err, errorPath, errorMsg);
    return ctx.throw(400, message);
  }

  try {
    await knex(table)
      .limit(1)
      .where(query)
      .first()
      .del();
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = {ok: true, userId: parseInt(query.userId, 10)};
});
