import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';
import { utcToDateString } from '../../utils';

export const decisionsByOrg = new Router();

const getDecisions = async (ctx: Koa.Context) => {
  const { query }: tIdQueryServer = ctx;
  const { id, limit, offset } = query;

  const orgId = parseInt(id, 10);
  const parsedLimit = limit ? parseInt(limit, 10) : 3;
  const parsedOffset = offset ? parseInt(offset, 10) : 0;

  const decisions = knex('decisions')
    .where({ orgId })
    .orderBy('date', 'desc');

  if (parsedLimit > 0) decisions.limit(parsedLimit);
  if (parsedOffset > 0) decisions.offset(parsedOffset);

  return decisions;
};

// @ts-ignore
decisionsByOrg.get('decisions', '/api/v1/decisionsByOrg', async (ctx: Koa.Context) => {
  try {
    const decisions = await getDecisions(ctx);
    const decisionsWithMappedDates: tDecision[] = decisions.map(utcToDateString);
    ctx.body = decisionsWithMappedDates;
  } catch (err) {
    ctx.throw('400', err);
  }
});

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
