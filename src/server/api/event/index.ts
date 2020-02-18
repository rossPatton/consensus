import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {validateSchema} from '../../utils';
import {getEventById} from './_queries';
import {getSchema} from './_schema';
export const event = new Router();
const route = '/api/v1/event';

event.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tIdQuery = _.get(ctx, 'state.locals.data', {});
  await validateSchema<tIdQuery>(ctx, getSchema, query);
  ctx.body = await getEventById(ctx, query);
});

// create a new event
// route example: admin event creation form
event.post(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, 'state.locals.data', {});
  const {isFormSubmit, ...newEvent} = data;

  let eventQuery = [] as tEvent[];
  try {
    eventQuery = await knex('events').insert(newEvent).returning('*');
  } catch (err) {
    ctx.throw(400, err);
  }

  ctx.body = eventQuery[0];
});
