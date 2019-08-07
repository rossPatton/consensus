import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';

export const org = new Router();

// @ts-ignore
org.get('org', '/api/v1/org', async (ctx: Koa.Context) => {
  try {
    ctx.body = await knex('orgs')
      .where(ctx.query)
      .limit(1)
      .first();
  } catch (err) {
    ctx.throw('400', err);
  }
});
