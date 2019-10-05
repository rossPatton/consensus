import Koa from 'koa';

import { knex } from '../db/connection';

// TODO add sanitization/validation
export const getUserByQuery = async (
  ctx: Koa.ParameterizedContext,
  query: any): Promise<tUser> => {

  let user: tUser;
  try {
    user = await knex('users').limit(1).where(query).first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  console.log('user => ', user);

  return user;
};
