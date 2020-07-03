import Koa from 'koa';
import Router from 'koa-router';

import {pg} from '~app/server/db/connection';
import {getSession} from '~app/server/queries';
import {validateSchema} from '~app/server/utils';

import {getUsersByGroupId} from './_queries';
import {deleteSchema, getSchema, patchSchema, postSchema} from './_schema';
import {tUserByOrgQuery} from './_types';

export const usersByGroupId = new Router();
const route = '/api/v1/usersByGroupId';
const table = 'users_roles';

/*
  @description get list of users that belong to a group, zipped with their roles
*/
usersByGroupId.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.usersByGroupIdQuery} = ctx;
  await validateSchema<ts.usersByGroupIdQuery>(ctx, getSchema, query);
  const users = await getUsersByGroupId(ctx, query);
  ctx.body = users;
});

/*
  @description for when a user joins a group
*/
usersByGroupId.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: tUserByOrgQuery} = ctx;
  await validateSchema<tUserByOrgQuery>(ctx, postSchema, query);
  const {groupId, role, userId} = query;

  const userByGroupIdRel = await pg(table)
    .limit(1)
    .where({groupId, userId, role})
    .first();

  if (userByGroupIdRel) {
    try {
      await pg(table)
        .where({id: userByGroupIdRel.id})
        .update({groupId, userId, role});
    } catch (err) {
      return ctx.throw(500, err);
    }
  } else {
    try {
      await pg(table).insert({groupId, userId, role});
    } catch (err) {
      return ctx.throw(500, err);
    }
  }

  const session = await getSession(ctx);
  ctx.body = session?.data?.profile;
});

/*
  @description for when a user's role is changed by an admin
*/
usersByGroupId.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.patchUserRoleQuery} = ctx;
  const {groupId, role, userId} = query;
  await validateSchema<ts.patchUserRoleQuery>(ctx, patchSchema, {groupId, role, userId});

  let updatedAccountRoleRel = [] as ts.roleRel[];
  try {
    updatedAccountRoleRel = await pg(table)
      .limit(1)
      .where({groupId, userId})
      .update({role})
      .returning(['groupId', 'role', 'userId']);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = updatedAccountRoleRel?.[0];
});

/*
  @description for when a user leaves or is removed from a group
*/
usersByGroupId.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: tUserByOrgQuery} = ctx;
  await validateSchema<tUserByOrgQuery>(ctx, deleteSchema, query);

  try {
    await pg(table)
      .limit(1)
      .where({groupId: query.groupId, userId: query.userId})
      .first()
      .del();
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = {userId: parseInt(query.userId, 10)};
});
