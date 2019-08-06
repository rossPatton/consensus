import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';

export const decisionsByOrg = new Router();

type tExpectedQuery = {
  query: {
    id: string,
    // technically, these are strings too, but doesn't really matter
    // since we only use it for the knex query, which doesnt care
    // but we want to include the orgId in the response, so we parse it
    limit?: number | 'ALL',
    offset?: number,
  }
};

// @ts-ignore
decisionsByOrg.get(
  'decisionsByOrg',
  '/api/v1/decisionsByOrg',
  async (ctx: Koa.ParameterizedContext) => {
    const { query }: tExpectedQuery = ctx;
    const { id, limit = 3, offset = 0 } = query;
    const orgId = parseInt(id, 10);

    const decisions = await knex('decisions')
      .select('*')
      .where({ orgId })
      .orderBy('date', 'desc')
      // @ts-ignore the type-defs here are incorrect - limit accepts nums & 'ALL'
      .limit(knex.raw(`LIMIT ${limit}`))
      .offset(offset);

    // convert UTC timestamps to human readable dates
    const decisionsWithMappedDates = decisions.map((decision: tDecision) => {
      const date = new Date(decision.date);
      return {
        ...decision,
        date: date.toLocaleString('en-US'),
      };
    });

    ctx.body = decisionsWithMappedDates;

    // get authentication status + active session data
    // const passport = await ctx.redis.get(ctx.session._sessCtx.externalKey);
    // // get user/org session. this object is determined by our serialization strategy
    // const passportSession = _.get(passport, 'passport.user', null);

    // // if user is logged in, we merge in relevant user data using their session id
    // if (passportSession) {
    //   // use 3rd table to get relation between users and events
    //   const userEventRelations = await knex('users_events')
    //     .where({ userId: passportSession.id });

    //   const eventsWithDatesAndUserRSVPData = userEventRelations.map(rel => {
    //     const matchingEvent = _.find(eventsWithMappedDates, (ev) => ev.id === rel.eventId);

    //     if (!matchingEvent) return null;

    //     return {
    //       ...matchingEvent,
    //       session: {
    //         attended: rel.attended,
    //         isGoing: rel.going,
    //         isInterested: rel.interested,
    //         isNotGoing: rel.notGoing,
    //       },
    //     };
    //   }).filter(ev => !!ev);

    //   ctx.body = eventsWithDatesAndUserRSVPData;
    // } else {
    //   ctx.body = decisionsWithMappedDates;
    // }
  });
