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
  await validateSchema<Partial<ts.meeting>>(ctx, upsertSchema, query);
  const {id, isFormSubmit, ...patch} = query;

  let patchedMeeting = [] as ts.meeting[];
  try {
    patchedMeeting = await knex('meetings')
      .limit(1)
      .where({id})
      .update(patch)
      .returning(eventKeys);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = patchedMeeting?.[0];
});

// @TODO implement upsert, ie make it work for both patch and post
meeting.post(route, async (ctx: Koa.ParameterizedContext) => {
  const query = ctx?.state?.locals?.data;
  await validateSchema<Partial<ts.meeting>>(ctx, upsertSchema, query);
  const {id, isFormSubmit, ...meeting} = query;

  let newMeeting = [] as ts.meeting[];
  try {
    if (id) {
      newMeeting = await knex('meetings')
        .limit(1)
        .where({id})
        .update(meeting)
        .returning('*');
    } else {
      newMeeting = await knex('meetings')
        .insert(meeting)
        .limit(1)
        .returning('*');
    }
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = newMeeting?.[0];
});
