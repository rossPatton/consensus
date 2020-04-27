import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../db/connection';

export const getRSVPByMeetingId = async (
  ctx: Koa.ParameterizedContext,
  meetingId: number): Promise<ts.rsvp> => {
  // user has to be logged in for rsvp functionality
  const userId = _.get(ctx, 'state.user.id', 0);

  let userEventRel: ts.rsvp;
  try {
    userEventRel = await knex('users_meetings')
      .limit(1)
      .where({userId, meetingId})
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  return userEventRel;
};
