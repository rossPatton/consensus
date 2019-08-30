import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const rsvps = new Router();
const route = '/api/v1/rsvps';
const table = 'users_events';

// get all rsvps for the logged in user, by eventId
rsvps.get(route, async (ctx: Koa.ParameterizedContext) => {
  const userId = _.get(ctx, 'state.user.id', 0);

  let body: tRSVP[];
  try {
    body = await knex(table).where({userId});
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (body instanceof Array && body.length === 0) {
    return ctx.throw(204);
  }

  ctx.body = body;
});

// post new rsvp for the logged in user, by eventId
rsvps.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {id = 0, value} = _.get(ctx, 'state.locals.data', {});
  const eventId = parseInt(id, 10);
  const userId = _.get(ctx, 'state.user.id', 0);

  const newRsvp: tRSVP = {
    eventId,
    rsvp: value === 'true',
    userId,
  };

  let currentRSVPStatus: tRSVP;
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
  if (currentRSVPStatus) {
    try {
      const update = await knex(table)
        .where({id: currentRSVPStatus.id})
        .update(newRsvp)
        .returning('*');
      ctx.body = update[0];
    } catch (err) {
      return ctx.throw(400, err);
    }
  }

  try {
    const update = await knex(table)
      .insert(newRsvp)
      .returning('*');
    ctx.body = update[0];
  } catch (err) {
    ctx.throw(400, err);
  }
});
