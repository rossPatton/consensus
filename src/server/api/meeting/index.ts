import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {eventKeys} from '../_constants';
import {knex} from '../../db/connection';
import {getMeetingByQuery} from '../../queries';
import {validateSchema} from '../../utils';
import {getSchema, upsertSchema} from './_schema';


const route = '/api/v1/meeting';
export const meeting = new Router();

meeting.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: ts.getMeetingQuery = ctx?.state?.locals?.data;
  await validateSchema<ts.getMeetingQuery>(ctx, getSchema, query);
  ctx.body = await getMeetingByQuery(ctx, query);
});

meeting.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const query = ctx?.state?.locals?.data;
  await validateSchema<Partial<ts.meetingSingular>>(ctx, upsertSchema, query);
  const {id, isFormSubmit, ...patch} = query;

  let patchedEvent = [] as ts.meeting[];
  try {
    patchedEvent = await knex('meetings')
      .limit(1)
      .where({id})
      .update(patch)
      .returning(eventKeys);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = patchedEvent?.[0];
});

// @TODO implement upsert, ie make it work for both patch and post
meeting.post(route, async (ctx: Koa.ParameterizedContext) => {
  const query = ctx?.state?.locals?.data;
  await validateSchema<Partial<ts.meeting>>(ctx, upsertSchema, query);
  const {id, isFormSubmit, ...meeting} = query;

  let newEvent = [] as ts.meeting[];
  try {
    if (id) {
      newEvent = await knex('meetings')
        .limit(1)
        .where({id})
        .update(meeting)
        .returning('*');
    } else {
      newEvent = await knex('meetings')
        .insert(meeting)
        .limit(1)
        .returning('*');
    }
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = newEvent?.[0];
});
