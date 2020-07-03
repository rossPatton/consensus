import Koa from 'koa';
import Router from 'koa-router';

import { pg } from '~app/server/db/connection';
import { validateSchema } from '~app/server/utils';

import { upsertSchema } from './_schema';
import { getRSVPsByQuery } from './queries';

export const rsvps = new Router();
const route = '/api/v1/rsvps';
const table = 'users_meetings';
const unauthorized = 'Must be logged in';

// get all rsvps for the logged in user, by meetingId
rsvps.get(route, async (ctx: Koa.ParameterizedContext) => {
  // const loggedInAccount = ctx?.state?.user;
  // if (!loggedInAccount) return ctx.throw(401, unauthorized);
  const rsvps = await getRSVPsByQuery(ctx, ctx.query);
  ctx.body = rsvps;
});

rsvps.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query} = ctx;
  await validateSchema(ctx, upsertSchema, query);

  const {meetingId, type = 'private', value = ''} = query;

  const loggedInAccount = ctx?.state?.user;
  if (!loggedInAccount) return ctx.throw(401, unauthorized);

  const newRsvp: ts.rsvp = {
    meetingId: parseInt(meetingId, 10),
    type,
    userId: loggedInAccount.id,
    value: value !== '' ? value : null,
  };

  let rsvpUpdate: ts.rsvp[] = [];
  try {
    rsvpUpdate = await pg(table)
      .first()
      .where({meetingId, userId: loggedInAccount.id})
      .update(newRsvp)
      .returning('*');
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = rsvpUpdate?.[0];
});

// this is an upsert, basically.
// if user doesnt have js enabled, all patches are posts by default
rsvps.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query} = ctx;
  await validateSchema(ctx, upsertSchema, query);

  const {meetingId, type = 'private', value = ''} = query;

  const loggedInAccount = ctx?.state?.user;
  if (!loggedInAccount) return ctx.throw(401, unauthorized);

  const newRsvp: ts.rsvp = {
    meetingId: parseInt(meetingId, 10),
    type,
    userId: loggedInAccount.id,
    value: value !== '' ? value : null,
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

  let rsvpUpdate: ts.rsvp[] = [];
  if (currentRSVPStatus) {
    try {
      rsvpUpdate = await pg(table)
        .first()
        .where({id: currentRSVPStatus.id})
        .update(newRsvp)
        .returning('*');
    } catch (err) {
      return ctx.throw(400, err);
    }
  } else {
    try {
      rsvpUpdate = await pg(table)
        .first()
        .insert(newRsvp)
        .returning('*');
    } catch (err) {
      ctx.throw(400, err);
    }
  }

  ctx.body = rsvpUpdate?.[0];
});

