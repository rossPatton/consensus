import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';
import { utcToDateString } from '../../utils';

export const eventsByOrg = new Router();

const getEvents = async (ctx: Koa.ParameterizedContext) => {
  const { query }: tIdQueryServer = ctx;
  const { id, limit, offset } = query;

  const orgId = parseInt(id, 10);
  const parsedLimit = limit ? parseInt(limit, 10) : 3;
  const parsedOffset = offset ? parseInt(offset, 10) : 0;

  const events = knex('events')
    .where({ orgId })
    .orderBy('date', 'asc');

  if (parsedLimit > 0) events.limit(parsedLimit);
  if (parsedOffset > 0) events.offset(parsedOffset);

  return events;
};

// @ts-ignore
eventsByOrg.get('events', '/api/v1/eventsByOrg', async (ctx: Koa.ParameterizedContext) => {
  try {
    const events = await getEvents(ctx);

    // convert UTC timestamps to human readable dates
    // easier to just normalize here on the server than do it every time on client
    const eventsWithMappedDates: tEvent[] = events.map(utcToDateString);

    ctx.body = eventsWithMappedDates; // returnValue;
  } catch (err) {
    ctx.throw('400', err);
  }
});
