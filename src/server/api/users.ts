import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';

export const users = new Router();

// @ts-ignore
users.get('users', '/api/v1/users', async (ctx: Koa.Context) => {
  try {
    const { limit = 10, offset = 0, ...query } = ctx.query;
    const users: tUser[] = await knex('users')
      .where(query)
      .limit(limit)
      .offset(offset);

    ctx.body = users;
  } catch (err) {
    ctx.throw('400', err);
  }
});
