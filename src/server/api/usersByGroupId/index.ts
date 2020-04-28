import Koa from 'koa';
import Router from 'koa-router';

import {knex} from '~app/server/db/connection';
import {getSession} from '~app/server/queries';
import {validateSchema} from '~app/server/utils';

import {getUsersByGroupId} from './_queries';
import {deleteSchema, getSchema, patchSchema, postSchema} from './_schema';
import {tUserByOrgQuery} from './_types';

export const usersByGroupId = new Router();
const route = '/api/v1/usersByGroupId';
const table = 'accounts_roles';


// api for interacting with the accounts_roles table
// not for signing up new users, but for getting users that are members of an org
// or joining an group, or updating member roles within an org
usersByGroupId.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: ts.usersByGroupIdQuery = ctx?.state?.locals?.data;
  await validateSchema<ts.usersByGroupIdQuery>(ctx, getSchema, query);
  const users = await getUsersByGroupId(ctx, query);
  ctx.body = users;
});

// joining an group. uses session data since we don't want people to be able to
// add others to an group, only the logged-in user should be able to do that
usersByGroupId.post(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tUserByOrgQuery = ctx?.state?.locals?.data;
  await validateSchema<tUserByOrgQuery>(ctx, postSchema, query);
  const {allowNonVerified, groupId, role, userId} = query;

  const {id: accountId, isVerified}: ts.account = await knex('accounts')
    .limit(1)
    .where({userId})
    .first()
    .select('id');

  if (!allowNonVerified && !isVerified) {
    return ctx.throw(400, 'Verify your account before joining this group');
  }

  const userByGroupIdRel = await knex(table)
    .limit(1)
    .where({accountId, groupId, userId, role})
    .first();

  if (userByGroupIdRel) {
    try {
      await knex(table)
        .where({id: userByGroupIdRel.id})
        .update({accountId, groupId, userId, role});
    } catch (err) {
      return ctx.throw(400, err);
    }
  } else {
    try {
      await knex(table).insert({accountId, groupId, userId, role});
    } catch (err) {
      return ctx.throw(400, err);
    }
  }

  // TODO should probably simplify this or store in server state somehow
  // get authentication status + active session data
  const passport = await ctx.redis.get(ctx.session._sessCtx.externalKey);
  const session = await getSession(ctx, passport?.passport?.user);
  ctx.body = session?.data?.profile || {};
});

usersByGroupId.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const query: ts.patchUserRoleQuery = ctx?.state?.locals?.data;
  const {groupId, role, userId} = query;
  await validateSchema<ts.patchUserRoleQuery>(ctx, patchSchema, {groupId, role, userId});

  let updatedAccountRoleRel = [] as ts.roleRel[];
  try {
    updatedAccountRoleRel = await knex(table)
      .limit(1)
      .where({groupId, userId})
      .update({role})
      .returning(['groupId', 'role', 'userId']);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = updatedAccountRoleRel?.[0];
});

usersByGroupId.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tUserByOrgQuery = ctx?.state?.locals?.data;

  await validateSchema<tUserByOrgQuery>(ctx, deleteSchema, query);

  try {
    await knex(table)
      .limit(1)
      .where({groupId: query.groupId, userId: query.userId})
      .first()
      .del();
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = {userId: parseInt(query.userId, 10)};
});
