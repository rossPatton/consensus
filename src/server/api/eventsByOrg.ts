import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { getDateNowAsISOStr } from '../../utils';
import { knex } from '../db/connection';

export const eventsByOrg = new Router();

const getEvents = async (ctx: Koa.ParameterizedContext) => {
  const { query }: tIdQueryServer = ctx;
  const { exclude, id, limit, isPublic, offset } = query;

  const orgId = parseInt(id, 10);
  const parsedLimit = limit ? parseInt(limit, 10) : 3;
  const parsedOffset = offset ? parseInt(offset, 10) : 0;

  // by default, we only return upcoming events
  const events = knex('events');

  // if we're excluding events, do it up front
  if (exclude) events.whereNot({id: exclude});

  // if user isn't logged in, only get public events
  if (isPublic) events.whereNot({isPrivate: true});

  events.where({orgId})
    .where('date', '>=', getDateNowAsISOStr())
    .orderBy('date', 'asc');

  if (parsedLimit > 0) events.limit(parsedLimit);
  if (parsedOffset > 0) events.offset(parsedOffset);

  return events;
};

// @ts-ignore
eventsByOrg.get('events', '/api/v1/eventsByOrg', async (ctx: Koa.ParameterizedContext) => {
  try {
    ctx.body = await getEvents(ctx);
  } catch (err) {
    ctx.throw('400', err);
  }
});
