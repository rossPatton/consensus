import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const event = new Router();

// event/eventId
event.get('/api/v1/event', async (ctx: Koa.ParameterizedContext) => {
  const id: number = _.get(ctx, 'state.locals.data.id', 0);

  let event: tEvent;
  try {
    event = await knex('events').limit(1).where({id}).first();
    ctx.body = event;
  } catch (err) {
    ctx.throw('400', err);
  }
});

// event creation form
event.post('/api/v1/event', async (ctx: Koa.ParameterizedContext) => {
  const event: tEvent = _.get(ctx, 'state.locals.data', {});

  let eventQuery: tEvent[];
  try {
    eventQuery = await knex('events').insert(event).returning('*');
    ctx.body = eventQuery[0];
  } catch (err) {
    ctx.throw(400, err);
  }
});
