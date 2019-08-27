import Koa from 'koa';
import Router from 'koa-router';

import { knex } from '../db/connection';

export const event = new Router();

// @ts-ignore
event.get('getEventById', '/api/v1/event', async (ctx: Koa.Context) => {
  try {
    const {id} = ctx.query;
    const event: tEvent = await knex('events').limit(1).where({id}).first();
    ctx.body = event;
  } catch (err) {
    ctx.throw('400', err);
  }
});

// event creation form
// @ts-ignore
event.post('postEvent', '/api/v1/event', async (ctx: Koa.Context) => {
  try {
    const event: tPublicEvent = ctx.query;
    const eventQuery = await knex('events').insert(event).returning('*');
    const newEventInsert = eventQuery[0];
    ctx.body = newEventInsert;
  } catch (err) {
    ctx.throw('400', err);
  }
});
