import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';
import { deSlugify } from '../../utils';

export const org = new Router();

// @ts-ignore
org.get('org', '/api/v1/org', async (ctx: Koa.Context) => {
  const {
    city: citySlug,
    country: countryCode,
    org: orgSlug,
    region: regionCode,
  } = ctx.query;

  const country = await knex('countries')
    .limit(1).where({code: countryCode}).first();

  const region = await knex('regions').limit(1).where({
    country: country.id,
    code: regionCode.toUpperCase(),
  }).first();

  const cityName = deSlugify(citySlug);
  const city = await knex('cities').limit(1).where({
    country: country.id,
    region: region.id,
    name: cityName,
  }).first();

  try {
    ctx.body = await knex('orgs')
      .limit(1)
      .where({
        country: country.id,
        city: city.id,
        region: region.id,
        slug: orgSlug,
      })
      .first();
  } catch (err) {
    ctx.throw('400', err);
  }
});
