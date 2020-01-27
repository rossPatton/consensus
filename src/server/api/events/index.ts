import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {filterEvs4Client, zipEvsWithRSVPS} from '../../utils'; // server only utils
import {getSchema} from './_schema';
import {tEventsServerQuery} from './_types';
import {getEventsByQuery} from './queries';

export const events = new Router();
const route = '/api/v1/events';
const dataPath = 'state.locals.data';

// get multiple events at a time
events.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tEventsServerQuery = _.get(ctx, dataPath, {});
  const account: tAccount = _.get(ctx, 'state.user', {});

  console.log('query => ', query);

  try {
    await getSchema.validateAsync<tEventsServerQuery>(query);
  } catch (err) {
    const message = _.get(err, 'details[0].message', 'Bad Request');
    return ctx.throw(400, message);
  }

  // get back events by orgId
  let events: tEvent[] = [];
  try {
    events = await getEventsByQuery(query);
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (events.length === 0) {
    ctx.status = 204;
  }

  // get account role if logged in
  // if not logged in, we'll want to hide private events and drafts
  // if user is logged in but just a member, we want to hide drafts
  const {id: accountId} = account;
  let accountRoleRel = {} as tAccountRoleRelation;
  if (accountId) {
    try {
      accountRoleRel = await knex('accounts_roles')
        .limit(1)
      // data.id === orgId of the org being viewed on the client
        .where({accountId, orgId: query.orgId})
        .first();
    } catch (err) {
      return ctx.throw(400, err);
    }
  }

  let userEventRels = {} as tRSVP[];
  const mappedEventIds: number[] = events.map(ev => ev.id);
  try {
    userEventRels = await knex('users_events')
      .whereIn('eventId', mappedEventIds)
      .where({
        publicRSVP: true,
      })
      .orWhere({
        privateRSVP: true,
      });
  } catch (err) {
    return ctx.throw(400, err);
  }

  const isAuthenticated = ctx.isAuthenticated();
  const role = _.get(accountRoleRel, 'role', null);
  const filteredEvents: tEvent[] = await filterEvs4Client(events, isAuthenticated, role);
  const eventsWithAttendees = await Promise.all(
    filteredEvents.map(ev => {
      const publicRSVPS = [...userEventRels].filter(
        rel => rel.eventId === ev.id && rel.publicRSVP,
      ).length;
      const privateRSVPS = [...userEventRels].filter(
        rel => rel.eventId === ev.id && rel.privateRSVP,
      ).length;

      return {
        ...ev,
        publicRSVPS,
        privateRSVPS,
      };
    }),
  );

  // if org admin account, this just returns the events we've already fetched
  const eventsWithRSVPS = await zipEvsWithRSVPS(ctx, eventsWithAttendees);
  ctx.body = eventsWithRSVPS;
});

// events.delete(route, async (ctx: Koa.ParameterizedContext) => {
//   const query = _.get(ctx, dataPath, {});

//   try {
//     await getSchema.validateAsync<tGetEventQuery>(query);
//   } catch (err) {
//     const message = _.get(err, 'details[0].message', 'Bad Request');
//     return ctx.throw(400, message);
//   }

//   try {
//     await knex(table)
//       .limit(1)
//       .where({id: query.id})
//       .del();
//   } catch (err) {
//     return ctx.throw(400, err);
//   }

//   ctx.body = {ok: true};
// });
