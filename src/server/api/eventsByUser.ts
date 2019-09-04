import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {getDateNowAsISOStr} from '../../utils';
import {knex} from '../db/connection';

export const eventsByUser = new Router();
const route = '/api/v1/eventsByUser';
const table = 'users_events';

eventsByUser.get(route, async (ctx: Koa.ParameterizedContext) => {
  const userId = _.get(ctx, 'state.user.id', 0);

  let userEventIds: tUserEventRelation[];
  try {
    userEventIds = await knex(table).where({userId});
  } catch (err) {
    return ctx.throw(400, err);
  }

  // mapped set of events that the user has RSVP'd to
  const mappedIds = _.uniq(userEventIds
    .filter(idSet => idSet.rsvp)
    .map(idSet => idSet.eventId)
  );

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
  const mappedEvents = events.map(ev => ({
    ...ev,
    rsvp: true,
  }));

  ctx.body = mappedEvents;
});
