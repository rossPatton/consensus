import Koa from 'koa';

import { knex } from '../db/connection';

export const getUserByQuery = async (
  ctx: Koa.ParameterizedContext,
  query: tUserQuery): Promise<tUser> => {

  let user: tUser;
  try {
    user = await knex('users').limit(1).where(query).first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  return user;
};
