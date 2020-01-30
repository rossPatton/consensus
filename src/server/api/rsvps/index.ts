import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../../db/connection';
import { getSchema, postSchema } from './_schema';
import { tPostRSVPServerQuery } from './_types';
import { getRSVPsByUserId } from './queries';

export const rsvps = new Router();
const dataPath = 'state.locals.data';
const errorMsg = 'Bad Request';
const errorPath = 'details[0].message';
const route = '/api/v1/rsvps';
const sessionPath = 'state.user';
const table = 'users_events';

// get all rsvps for the logged in user, by eventId
rsvps.get(route, async (ctx: Koa.ParameterizedContext) => {
  // state.user === account
  const {userId = 0} = _.get(ctx, sessionPath, {});

  try {
    await getSchema.validateAsync<{userId: number}>({userId});
  } catch (err) {
    const message = _.get(err, errorPath, errorMsg);
    return ctx.throw(400, message);
  }

  const rsvps = await getRSVPsByUserId(ctx, userId);
  ctx.body = rsvps;
});

// get all rsvps for the logged in user, by eventId
rsvps.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const data: tPostRSVPServerQuery = _.get(ctx, dataPath, {});
  const {isFormSubmit, ...query} = data;

  try {
    await postSchema.validateAsync<tPostRSVPServerQuery>(query);
  } catch (err) {
    const message = _.get(err, errorPath, errorMsg);
    return ctx.throw(400, message);
  }

  const {eventId, rsvpType = 'private', value = 'false'} = query;
  const {userId = 0} = _.get(ctx, sessionPath, {});
  const rsvp = value === 'true';
  const publicRSVP = rsvpType !== 'private' && rsvp;
  const privateRSVP = rsvpType === 'private' && rsvp;

  const newRsvp: tRSVP = {
    eventId: parseInt(eventId, 10),
    publicRSVP,
    privateRSVP,
    userId,
  };

  // TODO reduce branches or just simplify somehow
  // update existing event or insert new users_events relation
  let rsvpUpdate: tRSVP[] = [];
  try {
    rsvpUpdate = await knex(table)
      .first()
      .where({eventId, userId})
      .update(newRsvp)
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = rsvpUpdate[0];
});

// get all rsvps for the logged in user, by eventId
rsvps.post(route, async (ctx: Koa.ParameterizedContext) => {
  const data: tPostRSVPServerQuery = _.get(ctx, dataPath, {});
  const {isFormSubmit, ...query} = data;

  try {
    await postSchema.validateAsync<tPostRSVPServerQuery>(query);
  } catch (err) {
    const message = _.get(err, errorPath, errorMsg);
    return ctx.throw(400, message);
  }

  const {eventId, rsvpType = 'private', value = 'false'} = query;
  const {userId = 0} = _.get(ctx, sessionPath, {});
  const rsvp = value === 'true';
  const publicRSVP = rsvpType !== 'private' && rsvp;
  const privateRSVP = rsvpType === 'private' && rsvp;

  const newRsvp: tRSVP = {
    eventId: parseInt(eventId, 10),
    publicRSVP,
    privateRSVP,
    userId,
  };

  let currentRSVPStatus = {} as tRSVP;
  try {
    currentRSVPStatus = await knex(table)
      .limit(1)
      .where({eventId, userId})
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  // TODO reduce branches or just simplify somehow
  // update existing event or insert new users_events relation
  let rsvpUpdate: tRSVP[] = [];
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

  ctx.body = rsvpUpdate[0];
});

