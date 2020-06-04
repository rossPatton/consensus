import Koa from 'koa';

import {pg} from '~app/server/db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getRSVPsByUserId = async (
  ctx: Koa.ParameterizedContext,
  userId: number = 0): Promise<ts.rsvp[]> => {

  let rsvps: ts.rsvp[] = [];
  try {
    rsvps = await pg('users_meetings').where({userId});
  } catch (err) {
    return ctx.throw(500, err);
  }

  return rsvps;
};
