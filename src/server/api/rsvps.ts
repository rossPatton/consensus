import Koa from 'koa';
import Router from 'koa-router';

import { knex } from '../db/connection';

export const rsvps = new Router();
const route = '/api/v1/rsvps';
const table = 'users_events';

// get all rsvps for the logged in user, by eventId
rsvps.get(route, async (ctx: Koa.ParameterizedContext) => {
  try {
    const userId = ctx.state.user.id;
    ctx.body = await knex(table).where({userId});
  } catch (err) {
    ctx.throw(400, err);
  }
});

// post new rsvp for the logged in user, by eventId
rsvps.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {id, value} = ctx.state.locals.data;
  const eventId = parseInt(id, 10);
  const userId = ctx.state.user.id;

  const newRsvp = {
    eventId,
    rsvp: value === 'true',
    userId,
  };

  let currentRSVPStatus: any;
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
