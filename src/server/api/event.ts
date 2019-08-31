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

  let event: tEvent;
  try {
    ctx.body = await knex('events').limit(1).where(query).first();
  } catch (err) {
    ctx.throw('400', err);
  }
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
