import Koa from 'koa';

import { knex } from '../db/connection';

export const getUserByQuery = async (
  ctx: Koa.ParameterizedContext,
  query: ts.userQuery): Promise<ts.user> => {

  let user: ts.user;
  try {
    user = await knex('users').limit(1).where(query).first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  return user;
};
