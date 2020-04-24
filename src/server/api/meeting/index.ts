import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {eventKeys} from '../_constants';
import {knex} from '../../db/connection';
import {getMeetingByQuery} from '../../queries';
import {validateSchema} from '../../utils';
import {getSchema, upsertSchema} from './_schema';

const dataPath = 'state.locals.data';
const route = '/api/v1/meeting';
export const meeting = new Router();

meeting.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tGetMeetingQuery = _.get(ctx, dataPath, {});
  await validateSchema<tGetMeetingQuery>(ctx, getSchema, query);
  ctx.body = await getMeetingByQuery(ctx, query);
});

meeting.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  await validateSchema<Partial<tMeetingSingular>>(ctx, upsertSchema, query);
  const {id, isFormSubmit, ...patch} = query;

  let patchedEvent = [] as tMeeting[];
  try {
    patchedEvent = await knex('meetings')
      .limit(1)
      .where({id})
      .update(patch)
      .returning(eventKeys);
  } catch (err) {
    ctx.throw(500, err);
  }

  ctx.body = patchedEvent[0];
});

// @TODO implement upsert, ie make it work for both patch and post
meeting.post(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  await validateSchema<Partial<tMeeting>>(ctx, upsertSchema, query);
  const {id, isFormSubmit, ...meeting} = query;

  let newEvent = [] as tMeeting[];
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

  ctx.body = newEvent[0];
});
