import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const event = new Router();

// for fetching a single event at a time
// redux state object => event
// route example: event/eventId
event.get('/api/v1/event', async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, 'state.locals.data', {});
  const userId = _.get(ctx, 'state.user.id', 0);

  let event: tEvent;
  try {
    event = await knex('events')
      .limit(1)
      .where(query)
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  let userEventRel: tUserEventRelation;
  try {
    userEventRel = await knex('users_events')
      .limit(1)
      .where({userId, eventId: event.id})
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = {
    ...event,
    rsvp: userEventRel.rsvp,
  };
});

// create a new event
// route example: org admin event creation form
event.post('/api/v1/event', async (ctx: Koa.ParameterizedContext) => {
  const insert: tEvent = _.get(ctx, 'state.locals.data', {});

  let eventQuery: tEvent[];
  try {
    eventQuery = await knex('events').insert(insert).returning('*');
    ctx.body = eventQuery[0];
  } catch (err) {
    ctx.throw(400, err);
  }
});
