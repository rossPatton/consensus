import Koa from 'koa';
import Router from 'koa-router';

import { knex } from '~app/server/db/connection';
import { validateSchema } from '~app/server/utils';

import { getSchema, upsertSchema } from './_schema';
import { getRSVPsByUserId } from './queries';

export const rsvps = new Router();
const route = '/api/v1/rsvps';
const table = 'users_meetings';

// get all rsvps for the logged in user, by meetingId
rsvps.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {userId} = ctx?.state?.user;
  await validateSchema(ctx, getSchema, {userId});
  const rsvps = await getRSVPsByUserId(ctx, userId);
  ctx.body = rsvps;
});

rsvps.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query} = ctx;
  const {userId} = ctx?.state?.user;
  await validateSchema(ctx, upsertSchema, {...query, userId});

  const {meetingId, type = 'private', value = ''} = query;

  const newRsvp: ts.rsvp = {
    meetingId: parseInt(meetingId, 10),
    type,
    userId,
    value: value !== '' ? value : null,
  };

  let rsvpUpdate: ts.rsvp[] = [];
  try {
    rsvpUpdate = await knex(table)
      .first()
      .where({meetingId, userId})
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
  const {userId} = ctx?.state.user;
  await validateSchema(ctx, upsertSchema, {...query, userId});

  const {meetingId, type = 'private', value = ''} = query;

  const newRsvp: ts.rsvp = {
    meetingId: parseInt(meetingId, 10),
    type,
    userId,
    value: value !== '' ? value : null,
  };

  let currentRSVPStatus = {} as ts.rsvp;
  try {
    currentRSVPStatus = await knex(table)
      .limit(1)
      .where({meetingId, userId})
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  let rsvpUpdate: ts.rsvp[] = [];
  if (currentRSVPStatus) {
    try {
      rsvpUpdate = await knex(table)
        .first()
        .where({id: currentRSVPStatus.id})
        .update(newRsvp)
        .returning('*');
    } catch (err) {
      return ctx.throw(400, err);
    }
  } else {
    try {
      rsvpUpdate = await knex(table)
        .first()
        .insert(newRsvp)
        .returning('*');
    } catch (err) {
      ctx.throw(400, err);
    }
  }

  ctx.body = rsvpUpdate?.[0];
});

