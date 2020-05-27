import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '~app/server/db/connection';
import {getUserByQuery} from '~app/server/queries';
import {validateSchema} from '~app/server/utils';

import {deleteSchema, getSchema, postSchema} from './_schema';

export const invites = new Router();
const route = '/api/v1/invites';
const table = 'users_invites';

invites.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const query: ts.inviteQuery = ctx?.state?.locals?.data;
  await validateSchema<ts.inviteQuery>(ctx, deleteSchema, query);

  try {
    await knex(table)
      .limit(1)
      .where({groupId: query.groupId, userId: query.userId})
      .first()
      .del();
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = query;
});

invites.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: ts.inviteQuery = ctx?.state?.locals?.data;
  await validateSchema<ts.inviteQuery>(ctx, getSchema, query);

  let userInvites = [];
  try {
    userInvites = await knex(table).where(query);
  } catch (err) {
    return ctx.throw(500, err);
  }

  const ids = userInvites.map(invite => invite.userId);

  // we need more user info to render client side
  const users = await knex('users').whereIn('id', ids);

  // zip the user info into the userInvites array
  const mappedInvites = userInvites.map(userInvite => {
    const user = _.find(users, u => u.id === userInvite.userId);
    return {
      ...userInvite,
      user,
    };
  });

  ctx.body = mappedInvites;
});

invites.post(route, async (ctx: Koa.ParameterizedContext) => {
  const query: ts.inviteQuery = ctx?.state?.locals?.data;
  await validateSchema<ts.inviteQuery>(ctx, postSchema, query);

  const user = await getUserByQuery(ctx, {username: query.username});
  let newInviteReturning = {} as ts.userInvite[];
  try {
    newInviteReturning = await knex(table)
      .insert({
        groupId: query.groupId,
        userId: user.id,
        type: query.type || 'member',
      })
      .limit(1)
      .returning('*');
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = {
    ...newInviteReturning?.[0],
    user,
  };
});

// usersByGroupId.patch(route, async (ctx: Koa.ParameterizedContext) => {
//   const query: ts.patchUserRoleQuery = ctx?.state?.locals?.data;
//   const {groupId, role, userId} = query;
//   await validateSchema<ts.patchUserRoleQuery>(ctx, patchSchema, {groupId, role, userId});

//   let updatedAccountRoleRel = [] as ts.roleRel[];
//   try {
//     updatedAccountRoleRel = await knex(table)
//       .limit(1)
//       .where({groupId, userId})
//       .update({role})
//       .returning(['groupId', 'role', 'userId']);
//   } catch (err) {
//     return ctx.throw(500, err);
//   }

//   ctx.body = updatedAccountRoleRel?.[0];
// });
