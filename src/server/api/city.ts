import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';
import { deSlugify } from '../../utils';

export const city = new Router();

// @ts-ignore
city.get('city', '/api/v1/city', async (ctx: Koa.ParameterizedContext) => {
  const {query}: tLocationQueryServer = ctx;
  const {
    city: citySlug = '',
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

  const cityName = deSlugify(citySlug);
  let city: tCity;
  try {
    city = await knex('cities')
      .limit(1)
      .where({
        country: country.id,
        region: region.id,
        name: cityName,
      })
      .first();
  } catch (err) {
    return ctx.throw('400', err);
  }

  let orgs: tOrg[];
  try {
    orgs = await knex('orgs')
      .where({
        country: country.id,
        region: region.id,
        city: city.id,
      })
      .orderBy('name', 'asc');
  } catch (err) {
    return ctx.throw('400', err);
  }

  ctx.body = {
    ...city,
    orgs,
  };
});
