import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { deSlugify } from '../../utils';
import { knex } from '../db/connection';

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
    return ctx.throw(400, err);
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
    return ctx.throw(400, err);
  }

  let orgs: tOrg[];
  try {
    orgs = await knex('orgs')
      .where({
        cityId: city.id,
        countryId: country.id,
        regionId: region.id,
      })
      .orderBy('name');
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = {
    ...city,
    orgs: _.uniqBy(orgs, org => org.name),
  };
});
