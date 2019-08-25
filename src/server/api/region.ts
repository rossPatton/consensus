import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';

export const region = new Router();

// @ts-ignore
region.get('region', '/api/v1/region', async (ctx: Koa.ParameterizedContext) => {
  try {
    const { query }: any = ctx;
    const { country: countryCode, region: regionCode } = query;

    const country = await knex('countries')
      .limit(1).where({code: countryCode}).first();

    const region = await knex('regions').limit(1).where({
      country: country.id,
      code: regionCode.toUpperCase(),
    }).first();

    const cities = await knex('cities').where({
      country: country.id,
      region: region.id,
    });

    ctx.body = {
      ...region,
      cities,
    };
  } catch (err) {
    ctx.throw('400', err);
  }
});
