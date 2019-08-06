import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';

export const users = new Router();

// @ts-ignore
users.get('users', '/api/v1/users', async (ctx: Koa.Context) => {
  const { limit = 10, offset = 0, ...query } = ctx.query;

  try {
    ctx.body = await knex('users')
      .where(query)
      .limit(limit)
      .offset(offset);
  } catch (err) {
    ctx.throw('400', err);
  }
});
