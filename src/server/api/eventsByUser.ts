import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {getDateNowAsISOStr} from '../../utils';
import {knex} from '../db/connection';

export const eventsByUser = new Router();
const route = '/api/v1/eventsByUser';
const table = 'users_events';

eventsByUser.get(route, async (ctx: Koa.ParameterizedContext) => {
  // state.user === logged in account
  const userId = _.get(ctx, 'state.user.userId', 0);

  let userEventIds: tUserEventRelation[];
  try {
    userEventIds = await knex(table).where({userId});
  } catch (err) {
    return ctx.throw(400, err);
  }

  // mapped set of events that the user has RSVP'd to
  let mappedIds: number[];
  try {
    mappedIds = await Promise.all(_.uniq(
      userEventIds
        .filter(async idSet => idSet.rsvp)
        .map(async idSet => idSet.eventId)
    ));
  } catch (err) {
    return ctx.throw(400, err);
  }

  let events: tEvent[];
  try {
    events = await knex('events')
      .whereIn('id', mappedIds)
      .where('date', '>=', getDateNowAsISOStr())
      .orderBy('date', 'asc');
  } catch (err) {
    return ctx.throw(400, err);
  }

  // client side rendering expects a rsvp boolean on the event object
  let mappedEvents: tEvent[];
  try {
    mappedEvents = await Promise.all(events.map(async ev => ({
      ...ev,
      rsvp: true,
    })));
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = mappedEvents;
});
