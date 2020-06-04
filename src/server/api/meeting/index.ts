import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {pg} from '../../db/connection';
import {getMeetingByQuery} from '../../queries';
import {validateSchema} from '../../utils';
import {getSchema, upsertSchema} from './_schema';

const route = '/api/v1/meeting';
export const meeting = new Router();

meeting.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.getMeetingQuery} = ctx;
  await validateSchema<ts.getMeetingQuery>(ctx, getSchema, query);
  ctx.body = await getMeetingByQuery(ctx, query);
});

meeting.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query} = ctx;
  await validateSchema<Partial<ts.meeting>>(ctx, upsertSchema, query);
  const {id, ...patch} = query;

  let patchedMeeting = [] as ts.meeting[];
  try {
    patchedMeeting = await pg('meetings')
      .limit(1)
      .where({id})
      .update(patch)
      .returning('*');
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = patchedMeeting?.[0];
});

meeting.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: Partial<ts.meeting>} = ctx;
  await validateSchema<Partial<ts.meeting>>(ctx, upsertSchema, query);
  const {id, ...meeting} = query;

  let newMeeting = [] as ts.meeting[];
  try {
    newMeeting = await pg('meetings')
      .insert(meeting)
      .limit(1)
      .returning('*');
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = newMeeting?.[0];
});
