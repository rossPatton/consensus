import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {getEventByQuery} from '../../queries';
import {getSchema} from './_schema';

export const event = new Router();
const route = '/api/v1/event';

// TODO you need to create parity between events/event here
// ie, zip the rsvp and attendees info here
event.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tGetEventQuery = _.get(ctx, 'state.locals.data', {});

  try {
    await getSchema.validateAsync<tGetEventQuery>(query);
  } catch (err) {
    const message = _.get(err, 'details[0].message', 'Bad Request');
    return ctx.throw(400, message);
  }

  const event = await getEventByQuery(ctx, query);
  ctx.body = event;
});

// create a new event
// route example: org admin event creation form
event.post(route, async (ctx: Koa.ParameterizedContext) => {
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
