import dayJS from 'dayjs';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {getRSVPsByUserId} from '../../queries';
import {validateSchema, zipEventsWithAttendees} from '../../utils';
import {schema} from './_schema';
import {tEventsByUserServerQuery} from './_types';

export const eventsByUserId = new Router();
const dataPath = 'state.locals.data';
const route = '/api/v1/eventsByUserId';

eventsByUserId.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tEventsByUserServerQuery = _.get(ctx, dataPath, {});
  await validateSchema(ctx, schema, query);

  const userRSVPs = await getRSVPsByUserId(ctx, query.userId);

  // mapped set of events that the user has RSVP'd to
  let mappedIds: number[] = [];
  try {
    mappedIds = await Promise.all(_.uniq(
      userRSVPs.map(async idSet => idSet.eventId),
    ));
  } catch (err) {
    return ctx.throw(400, err);
  }

  // now only return future events where the user rsvped
  let events: tEvent[] = [];
  try {
    events = await knex('events')
      .whereIn('id', mappedIds)
      .where('date', '>=', dayJS().toISOString())
      .orderBy('date', 'asc');
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = await zipEventsWithAttendees(events, userRSVPs);
});
