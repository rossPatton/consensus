import Koa from 'koa';

import {pg} from '~app/server/db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getRSVPsByQuery = async (
  ctx: Koa.ParameterizedContext,
  query: any): Promise<ts.rsvp[]> => {
  console.log('getRSVPsByQuery query => ', query);

  let rsvps = [] as ts.rsvp[];
  try {
    rsvps = await pg('users_meetings').where(query);
  } catch (err) {
    return ctx.throw(500, err);
  }

  console.log('rsvps => ', rsvps);

  return rsvps;
};
