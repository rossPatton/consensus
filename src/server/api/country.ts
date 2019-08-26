import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';

export const country = new Router();

// @ts-ignore
country.get('country', '/api/v1/country', async (ctx: Koa.ParameterizedContext) => {
  const {query}: tLocationQueryServer = ctx;
  const {country: code = ''} = query;

  let country: tCountry;
  try {
    country = await knex('countries').limit(1).where({code}).first();
  } catch (err) {
    return ctx.throw('400', err);
  }

  let regions: tRegion[];
  try {
    regions = await knex('regions').where({country: 1});
  } catch (err) {
    return ctx.throw('400', err);
  }

  ctx.body = {
    ...country,
    regions,
  };
});
