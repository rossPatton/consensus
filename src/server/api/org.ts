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

  console.log('ctx.query => ', ctx.query);

  const country = await knex('countries').limit(1)
    .where({code: countryCode}).first();

  console.log('country => ', country);

  const region = await knex('regions').limit(1).where({
    country: country.id,
    code: regionCode,
  }).first();

  console.log('region => ', region);

  const cityName = deSlugify(citySlug);
  const city = await knex('cities').limit(1).where({
    country: country.id,
    region: region.id,
    name: cityName,
  }).first();

  console.log('city => ', city);
  console.dir({
    country: country.id,
    city: city.id,
    region: region.id,
    slug: orgSlug,
  });

  const org = await knex('orgs')
    .limit(1)
    .where({
      country: country.id,
      city: city.id,
      region: region.id,
      slug: orgSlug,
    })
    .first();

  console.log('org => ', org);

  try {
    ctx.body = org;
  } catch (err) {
    ctx.throw('400', err);
  }
});
