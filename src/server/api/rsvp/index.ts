import Koa from 'koa';
import Router from 'koa-router';

import { pg } from '~app/server/db/connection';
import { validateSchema } from '~app/server/utils';

import { postSchema } from './_schema';

export const rsvp = new Router();
const route = '/api/v1/rsvp';
const table = 'users_meetings';

// post new rsvp for the logged in user, by meetingId
// this is an upsert basically, post if new, patch if not
rsvp.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query} = ctx;
  await validateSchema(ctx, postSchema, query);

  const {meetingId, type = 'private', value = ''} = query;

  const loggedInAccount = ctx?.state?.user;
  if (!loggedInAccount) return ctx.throw(401, 'Must be logged in');

  const newRsvp: ts.rsvp = {
    meetingId,
    type,
    userId: loggedInAccount.id,
    value,
  };

  let currentRSVPStatus = {} as ts.rsvp;
  try {
    currentRSVPStatus = await pg(table)
      .limit(1)
      .where({meetingId, userId: loggedInAccount.id})
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  // TODO reduce branches or just simplify somehow
  // update existing meeting or insert new users_meetings relation
  if (currentRSVPStatus) {
    try {
      const update: ts.rsvp[] = await pg(table)
        .where({id: currentRSVPStatus.id})
        .update(newRsvp)
        .returning('*');
      ctx.body = update?.[0];
    } catch (err) {
      return ctx.throw(500, err);
    }
  } else {
    try {
      const insert: ts.rsvp[] = await pg(table)
        .insert(newRsvp)
        .returning('*');
      ctx.body = insert?.[0];
    } catch (err) {
      ctx.throw(500, err);
    }
  }
});
