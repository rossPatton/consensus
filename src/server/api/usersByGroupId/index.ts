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
const table = 'users_roles';


// api for interacting with the users_roles table
// not for signing up new users, but for getting users that are members of an org
// or joining an group, or updating member roles within an org
usersByGroupId.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.usersByGroupIdQuery} = ctx;
  await validateSchema<ts.usersByGroupIdQuery>(ctx, getSchema, query);
  const users = await getUsersByGroupId(ctx, query);
  ctx.body = users;
});

// joining an group
usersByGroupId.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: tUserByOrgQuery} = ctx;
  await validateSchema<tUserByOrgQuery>(ctx, postSchema, query);
  const {groupId, role, userId} = query;

  const userByGroupIdRel = await knex(table)
    .limit(1)
    .where({groupId, userId, role})
    .first();

  if (userByGroupIdRel) {
    try {
      await knex(table)
        .where({id: userByGroupIdRel.id})
        .update({groupId, userId, role});
    } catch (err) {
      return ctx.throw(500, err);
    }
  } else {
    try {
      await knex(table).insert({groupId, userId, role});
    } catch (err) {
      return ctx.throw(500, err);
    }
  }

  const session = await getSession(ctx);
  ctx.body = session?.data?.profile;
});

usersByGroupId.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.patchUserRoleQuery} = ctx;
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
  const {query}: {query: tUserByOrgQuery} = ctx;
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
