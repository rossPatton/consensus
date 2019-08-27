import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const country = new Router();

// @ts-ignore
country.get('country', '/api/v1/country', async (ctx: Koa.ParameterizedContext) => {
  const {query}: tLocationQueryServer = ctx;
  const {country: code = ''} = query;

  let country: tCountry;
  try {
    country = await knex('countries')
      .limit(1)
      .where({code})
      .orderBy('name', 'asc')
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  let regions: tRegion[];
  try {
    regions = await knex('regions')
      .where({country: country.id})
      .orderBy('name', 'asc');
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = {
    ...country,
    regions: _.uniqBy(regions, region => region.name),
  };
});
