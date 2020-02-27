import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {validateSchema} from '../../utils';
import {getEventById} from './_queries';
import {getSchema, upsertSchema} from './_schema';

const dataPath = 'state.locals.data';
const route = '/api/v1/event';
export const event = new Router();

event.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tIdQuery = _.get(ctx, dataPath, {});
  await validateSchema<tIdQuery>(ctx, getSchema, query);
  ctx.body = await getEventById(ctx, query);
});

event.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  await validateSchema<Partial<tEvent>>(ctx, upsertSchema, query);
  const {id, isFormSubmit, ...patch} = query;

  let patchedEvent = [] as tEvent[];
  try {
    patchedEvent = await knex('events')
      .limit(1)
      .where({id})
      .update(patch)
      .returning('*');
  } catch (err) {
    ctx.throw(400, err);
  }

  ctx.body = patchedEvent[0];
});

// @TODO implement upsert, ie make it work for both patch and post
event.post(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  await validateSchema<Partial<tEvent>>(ctx, upsertSchema, query);
  const {id, isFormSubmit, ...event} = query;

  let newEvent = [] as tEvent[];
  try {
    if (id) {
      newEvent = await knex('events')
        .limit(1)
        .where({id})
        .update(event)
        .returning('*');
    } else {
      newEvent = await knex('events')
        .insert(event)
        .limit(1)
        .returning('*');
    }
  } catch (err) {
    ctx.throw(400, err);
  }

  ctx.body = newEvent[0];
});
