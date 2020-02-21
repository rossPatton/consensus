import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {getAccountRoleRelByOrgId, getOrgById, getRSVPsByUserId} from '../../queries';
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

  // user role for this particular org
  const {role, userId} = await getAccountRoleRelByOrgId(ctx, query.orgId);
  const org = await getOrgById(ctx, query.orgId);

  // if fetching events for a private org and the user is not a member
  if (!role && org.type !== 'public') return ctx.throw(401);

  // basically, if a member of the group or public group, but no events scheduled
  if (!events) {
    ctx.status = 204;
    ctx.body = [];
  }

  // all user rsvps
  const userRSVPs = await getRSVPsByUserId(ctx, userId);
  // zip rsvps up with events, split by public vs private rsvps
  const eventsWithRSVPCount = await zipEventsWithAttendees(events, userRSVPs);

  // return zipped events, filtered based on user login status, role, etc
  const body = await filterEvents(ctx, eventsWithRSVPCount, role);
  ctx.body = body;
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
