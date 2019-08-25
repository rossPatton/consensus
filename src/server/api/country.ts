import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';

export const country = new Router();

// @ts-ignore
country.get('country', '/api/v1/country', async (ctx: Koa.ParameterizedContext) => {
  try {
    const { query }: any = ctx;
    const { country: code } = query;

    const country = await knex('countries').limit(1).where({code}).first();
    const regions = await knex('regions').where({country: country.id});

    ctx.body = {
      ...country,
      regions,
    };
  } catch (err) {
    ctx.throw('400', err);
  }
});
