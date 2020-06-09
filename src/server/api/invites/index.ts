import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';
import {validateSchema} from '~app/server/utils';

import {queue} from '..';
import {deleteSchema, getSchema, postSchema} from './_schema';

export const invites = new Router();
const route = '/api/v1/invites';
const table = 'users_invites';


// TODO split this into routes by user and by group, and just use session
invites.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.inviteQuery} = ctx;
  await validateSchema<ts.inviteQuery>(ctx, deleteSchema, query);

  try {
    await queue.add(() => pg.transaction(async trx => pg(table)
      .transacting(trx)
      .limit(1)
      .where({groupId: query.groupId, userId: query.userId})
      .first()
      .del()
      .then(trx.commit)
      .catch(trx.rollback),
    ));

    // we return the query back for redux. to remove it from the list
    ctx.body = query;
  } catch (err) {
    return ctx.throw(500, err);
  }
});

invites.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.inviteQuery} = ctx;
  await validateSchema<ts.inviteQuery>(ctx, getSchema, query);

  try {
    await queue.add(() => pg.transaction(async trx => {
      const userInvites = await pg(table).transacting(trx).where(query);
      let mappedInvites = userInvites;
      // if group, we want to render info about the users we are inviting
      if (query.groupId) {
        const ids = await Promise.all(userInvites.map(invite => invite.userId));
        const users = await pg('users').transacting(trx).whereIn('id', ids);

        // zip the user info into the userInvites array
        mappedInvites = await Promise.all(userInvites.map(userInvite => {
          const user = _.find(users, u => u.id === userInvite.userId);
          return {
            ...userInvite,
            user,
          };
        }));
      // if user, we want to render info about the groups that are doing the inviting
      } else if (query.userId) {
        const ids = await Promise.all(userInvites.map(invite => invite.groupId));
        const groups = await pg('groups').transacting(trx).whereIn('id', ids);

        // zip the user info into the userInvites array
        mappedInvites = await Promise.all(userInvites.map(userInvite => {
          const group = _.find(groups, g => g.id === userInvite.groupId);
          return {
            ...userInvite,
            group,
          };
        }));
      }

      ctx.body = mappedInvites;
    }));
  } catch (err) {
    return ctx.throw(500, err);
  }
});

invites.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.inviteQuery} = ctx;
  await validateSchema<ts.inviteQuery>(ctx, postSchema, query);

  try {
    await queue.add(() => pg.transaction(async trx => {
      const user = await pg('users')
        .transacting(trx)
        .limit(1)
        .where(query)
        .first();

      const newInviteReturning = await pg(table)
        .transacting(trx)
        .insert({
          groupId: query.groupId,
          userId: user.id,
          type: query.type || 'member',
        })
        .limit(1)
        .returning('*')
        .then(trx.commit)
        .catch(trx.rollback);

      ctx.body = {
        ...newInviteReturning?.[0],
        user,
      };
    }));
  } catch (err) {
    ctx.throw(500, err);
  }
});
