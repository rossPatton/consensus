import Koa from 'koa';

import { knex } from '../db/connection';

// TODO add sanitization/validation
export const getUsersByIds = async (
  ctx: Koa.ParameterizedContext,
  mappedIds: number[]): Promise<tUser[]> => {

  // rn this route is only used as a test route, so just return everything
  const stream = knex('users').whereIn('id', mappedIds).stream();
  const users: tUser[] = [];
  try {
    for await (const chunk of stream) {
      users.push(chunk);
    }
  } catch (err) {
    return ctx.throw(400, err);
  }

  return users;
};
