import Knex from 'knex';
import Koa from 'koa';

import {pg} from '../db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getRSVPsByUserId = async (
  trx: Knex.Transaction,
  ctx: Koa.ParameterizedContext,
  userId: string | number = 0): Promise<ts.rsvp[]> => {
  try {
    return pg('users_meetings')
      .transacting(trx)
      .where({
        userId,
        value: 'yes',
      });
  } catch (err) {
    return ctx.throw(500, err);
  }
};
