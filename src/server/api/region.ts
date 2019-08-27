import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const region = new Router();

// @ts-ignore
region.get('region', '/api/v1/region', async (ctx: Koa.ParameterizedContext) => {
  const {query}: tLocationQueryServer = ctx;
  const {
    country: countryCode = '',
    region: regionCode = '',
  } = query;

  let country: tCountry;
  try {
    country = await knex('countries')
      .limit(1)
      .where({code: countryCode})
      .first();
  } catch (err) {
    return ctx.throw('400', err);
  }

  let region: tRegion;
  try {
    region = await knex('regions')
      .limit(1)
      .where({
        country: country.id,
        code: regionCode,
      })
      .first();
  } catch (err) {
    return ctx.throw('400', err);
  }

  let cities: tCity[];
  try {
    cities = await knex('cities')
      .where({
        country: country.id,
        region: region.id,
      })
      .orderBy('name', 'asc');
  } catch (err) {
    return ctx.throw('400', err);
  }

  ctx.body = {
    ...region,
    cities: _.uniqBy(cities, city => city.name),
  };
});
