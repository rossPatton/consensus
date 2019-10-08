import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';
import {getEventByQuery} from '../queries';

export const event = new Router();

// TODO you need to create parity between events/event here
// ie, zip the rsvp and attendees info here

// for fetching a single event at a time
// redux state object => event
// route example: event/eventId
event.get('/api/v1/event', async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, 'state.locals.data', {});
  const event = await getEventByQuery(ctx, query);
  ctx.body = event;
});

// create a new event
// route example: org admin event creation form
event.post('/api/v1/event', async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, 'state.locals.data', {});
  const {isFormSubmit, ...newEvent} = data;

  let eventQuery: tEvent[];
  try {
    eventQuery = await knex('events').insert(newEvent).returning('*');
    ctx.body = eventQuery[0];
  } catch (err) {
    ctx.throw(400, err);
  }
});
