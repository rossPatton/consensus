import Koa from 'koa';

import {knex} from '../db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getRSVPsByUserId = async (
  ctx: Koa.ParameterizedContext,
  userId: number = 0): Promise<tRSVP[]> => {

  let rsvps: tRSVP[];
  try {
    rsvps = await knex('users_events').where({userId});
  } catch (err) {
    return ctx.throw(400, err);
  }

  return rsvps;
};
