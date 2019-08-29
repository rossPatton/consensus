import Koa from 'koa';
import Router from 'koa-router';

import { knex } from '../db/connection';

export const rsvp = new Router();
const route = '/api/v1/rsvp';

// @ts-ignore
rsvp.get('get user rsvp', route, async (ctx: Koa.Context) => {
  try {
    const {id} = ctx.query;
    const event = await knex('users_events').limit(1).where({id}).first();
    ctx.body = event;
  } catch (err) {
    ctx.throw('400', err);
  }
});

// event creation form
// @ts-ignore
rsvp.post('post user rsvp', route, async (ctx: Koa.Context) => {
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
    currentRSVPStatus = await knex('users_events')
      .limit(1)
      .where({eventId, userId})
      .first();
  } catch (err) {
    ctx.throw('400', err);
  }

  // TODO reduce branches or just simplify somehow
  // update existing event or insert new users_events relation
  if (currentRSVPStatus) {
    try {
      const eventQuery = await knex('users_events')
        .where({id: currentRSVPStatus.id})
        .update(newRsvp)
        .returning('*');

      ctx.body = eventQuery[0];
    } catch (err) {
      ctx.throw('400', err);
    }
  } else {
    try {
      const eventQuery = await knex('users_events')
        .insert(newRsvp)
        .returning('*');

      ctx.body = eventQuery[0];
    } catch (err) {
      ctx.throw('400', err);
    }
  }
});
