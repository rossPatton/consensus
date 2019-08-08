import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';
import { notNull, utcToDateString } from '../../utils';

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

    // default return, if user is logged out, we return this
    let returnValue = eventsWithMappedDates;

    // get authentication status + active session data
    const passport = await ctx.redis.get(ctx.session._sessCtx.externalKey);

    // get user/org session. this object is determined by our serialization strategy
    const session = _.get(passport, 'passport.user', {});

    // if user is logged in, we merge in relevant user data using their session id
    if (session.id) {
      // use 3rd table to get relation between users and events
      const userEventRels = await knex('users_events').where({userId: session.id});

      const eventsWithDatesAndUserRSVPData = userEventRels.map(
        (rel: tUserEventRelation) => {
          const matchingEvent = _.find(
            eventsWithMappedDates,
            ev => ev.id === rel.eventId
          );

          if (!matchingEvent) return null;

          return {
            ...matchingEvent,
            session: {
              attended: rel.attended,
              isGoing: rel.going,
              isInterested: rel.interested,
            },
          };
        }).filter(notNull);

      returnValue = eventsWithDatesAndUserRSVPData;
    }

    ctx.body = returnValue;
  } catch (err) {
    ctx.throw('400', err);
  }
});
