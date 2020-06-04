import Koa from 'koa';

import {pg} from '../db/connection';

export const getRSVPByMeetingId = async (
  ctx: Koa.ParameterizedContext,
  meetingId: number): Promise<ts.rsvp> => {
  // user has to be logged in for rsvp functionality
  const userId = ctx?.state?.user?.id;

  let userEventRel: ts.rsvp;
  try {
    userEventRel = await pg('users_meetings')
      .limit(1)
      .where({userId, meetingId})
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  return userEventRel;
};
