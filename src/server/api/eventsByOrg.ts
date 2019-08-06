import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';

export const eventsByOrg = new Router();

type tExpectedQuery = {
  query: {
    id: string,
    // technically, these are strings too, but doesn't really matter
    // since we only use it for the knex query, which doesnt care
    // but we want to include the orgId in the response, so we parse it
    limit?: number,
    offset?: number,
  }
};

// @ts-ignore
eventsByOrg.get('eventsByOrg', '/api/v1/eventsByOrg',
  async (ctx: Koa.ParameterizedContext) => {
    const { query }: tExpectedQuery = ctx;
    const { id, limit = 3, offset = 0 } = query;
    const orgId = parseInt(id, 10);

    // use the returned ids to query users table
    const events = await knex.select('*')
      .from('events')
      .where({ orgId })
      .orderBy('date', 'asc')
      .limit(limit)
      .offset(offset);

    // convert UTC timestamps to human readable dates
    const eventsWithMappedDates = events.map(event => {
      const date = new Date(event.date);
      return {
        ...event,
        date: date.toLocaleString('en-US'),
      };
    });

    // get authentication status + active session data
    const passport = await ctx.redis.get(ctx.session._sessCtx.externalKey);
    // get user/org session. this object is determined by our serialization strategy
    const passportSession = _.get(passport, 'passport.user', null);

    // if user is logged in, we merge in relevant user data using their session id
    if (passportSession) {
      // use 3rd table to get relation between users and events
      const userEventRelations = await knex('users_events')
        .where({ userId: passportSession.id });

      const eventsWithDatesAndUserRSVPData = userEventRelations.map(rel => {
        const matchingEvent = _.find(eventsWithMappedDates, (ev) => ev.id === rel.eventId);

        if (!matchingEvent) return null;

        return {
          ...matchingEvent,
          session: {
            attended: rel.attended,
            isGoing: rel.going,
            isInterested: rel.interested,
            isNotGoing: rel.notGoing,
          },
        };
      }).filter(ev => !!ev);

      ctx.body = eventsWithDatesAndUserRSVPData;
    } else {
      ctx.body = eventsWithMappedDates;
    }
  });
