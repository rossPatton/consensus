import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';
import { deSlugify } from '../../utils';

export const city = new Router();

// @ts-ignore
city.get('city', '/api/v1/city', async (ctx: Koa.ParameterizedContext) => {
  try {
    const { query }: any = ctx;
    const {
      city: citySlug,
      country: countryCode,
      region: regionCode,
    } = query;

    const country = await knex('countries')
      .limit(1).where({code: countryCode}).first();

    const region = await knex('regions').limit(1).where({
      country: country.id,
      code: regionCode,
    }).first();

    const cityName = deSlugify(citySlug);
    const city = await knex('cities').limit(1).where({
      country: country.id,
      region: region.id,
      name: cityName,
    }).first();

    const orgs = await knex('orgs').where({
      country: country.id,
      region: region.id,
      city: city.id,
    });

    ctx.body = {
      ...city,
      orgs,
    };
  } catch (err) {
    ctx.throw('400', err);
  }
});
