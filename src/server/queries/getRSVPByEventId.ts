import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../db/connection';

export const getRSVPByEventId = async (
  ctx: Koa.ParameterizedContext,
  eventId: number): Promise<tRSVP> => {
  // user has to be logged in for rsvp functionality
  const userId = _.get(ctx, 'state.user.id', 0);

  let userEventRel: tRSVP;
  try {
    userEventRel = await knex('users_events')
      .limit(1)
      .where({userId, eventId})
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  return userEventRel;
};
