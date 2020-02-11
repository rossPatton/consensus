import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {getAccountRoleRelByOrgId, getRSVPsByUserId} from '../../queries';
import {validateSchema, zipEventsWithAttendees} from '../../utils';
import {getEventsByQuery} from './_queries';
import {deleteSchema, getSchema} from './_schema';
import {tEventsServerQuery} from './_types';
import {filterEvents} from './_utils';

export const events = new Router();
const route = '/api/v1/events';
const dataPath = 'state.locals.data';
const table = 'events';

// get multiple events at a time
events.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tEventsServerQuery = _.get(ctx, dataPath, {});
  await validateSchema<tEventsServerQuery>(ctx, getSchema, query);

  // all events by generic query
  const events = await getEventsByQuery(ctx, query);

  console.log('all generic events => ', events);

  // user role for this particular org
  const {role, userId} = await getAccountRoleRelByOrgId(ctx, query.orgId);

  console.log('user role => ', role);

  // all user rsvps
  const userRSVPs = await getRSVPsByUserId(ctx, userId);

  // zip rsvps up with events, split by public vs private rsvps
  const eventsWithRSVPCount = await zipEventsWithAttendees(events, userRSVPs);

  console.log('events with rsvp counts => ', eventsWithRSVPCount);

  // return zipped events, filtered based on user login status, role, etc
  ctx.body = await filterEvents(ctx, eventsWithRSVPCount, role);
});

events.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tIdQuery = _.get(ctx, dataPath, {});
  await validateSchema<tIdQuery>(ctx, deleteSchema, query);

  try {
    await knex(table).limit(1).where({id: query.id}).del();
  } catch (err) {
    return ctx.throw(400, err);
  }

  // we use the id on the client to filter out the now deleted event
  ctx.body = {id: parseInt(query.id as string, 10)};
});

// create a new event
// route example: org admin event creation form
// event.post(route, async (ctx: Koa.ParameterizedContext) => {
//   const data = _.get(ctx, 'state.locals.data', {});
//   const {isFormSubmit, ...newEvent} = data;

//   let eventQuery: tEvent[] = {};
//   try {
//     eventQuery = await knex('events').insert(newEvent).returning('*');
//   } catch (err) {
//     ctx.throw(400, err);
//   }

//   ctx.body = eventQuery[0];
// });
