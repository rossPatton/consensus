import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const eventsByUser = new Router();
const route = '/api/v1/eventsByUser';
const table = 'users_events';

eventsByUser.get(route, async (ctx: Koa.ParameterizedContext) => {
  const userId = _.get(ctx, 'state.user.id', 0);

  let userIds: tUserEventRelation[];
  try {
    userIds = await knex(table).where({userId});
  } catch (err) {
    return ctx.throw(400, err);
  }

  // mapped set of events that the user has RSVP'd to
  const mappedIds = userIds
    .filter(idSet => idSet.rsvp)
    .map(idSet => idSet.eventId);

  let events: tEvent[];
  try {
    events = await knex('events').whereIn('id', mappedIds);
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = events;
});
