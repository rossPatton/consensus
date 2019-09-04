import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { deSlugify } from '../../utils';
import { knex } from '../db/connection';

export const org = new Router();
const route = '/api/v1/org';

org.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {
    city: citySlug,
    country: countryCode,
    region: regionCode,
    slug: orgSlug,
  } = ctx.state.locals.data;

  let country: tCountry;
  try {
    country = await knex('countries')
      .limit(1)
      .where({code: countryCode})
      .first();
  } catch (err) {
    return ctx.throw(400, err);
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

  let city: tCity;
  try {
    const cityName = deSlugify(citySlug);
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

  let org: tOrg;
  try {
    org = await knex('orgs')
      .limit(1)
      .where({
        countryId: country.id,
        cityId: city.id,
        regionId: region.id,
        slug: orgSlug,
      })
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = org;
});
