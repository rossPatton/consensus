import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { deSlugify } from '../../../utils';
import { knex } from '../../db/connection';
import { validateSchema } from '../../utils';
import { schema } from './_schema';

export const city = new Router();
const route = '/api/v1/city';

city.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: ts.directoryParams = ctx?.state?.locals?.data || {};
  await validateSchema<ts.directoryParams>(ctx, schema, query);

  const { city: citySlug, regionCode} = query;

  // @TODO add back once we have more countries to query
  // let country = {} as ts.country;
  // try {
  //   country = await knex('countries')
  //     .limit(1)
  //     .where({code: countryCode})
  //     .first();
  // } catch (err) {
  //   return ctx.throw(500, err);
  // }

  let region = {} as ts.region;
  try {
    region = await knex('regions')
      .limit(1)
      .where({
        countryId: 1,
        code: regionCode,
      })
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  const cityName = deSlugify(citySlug);
  let city = {} as ts.city;
  try {
    city = await knex('cities')
      .limit(1)
      .where({
        countryId: 1,
        regionId: region.id,
        name: cityName,
      })
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  // @TODO eventually add post codes
  // let postcodes = [] as {code: string}[];
  // if (city.id) {
  //   try {
  //     postcodes = await knex('postcodes').where({city: city.id}).select('code');
  //   } catch (err) {
  //     return ctx.throw(500, err);
  //   }
  // }

  let groups = [] as ts.group[];
  try {
    groups = await knex('groups')
      .where({
        cityId: city.id,
        countryId: 1,
        regionId: region.id,
      })
      // exclude invite-only group from results
      .whereNot({
        type: 'hidden',
      })
      .orderBy('name');
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = {
    ...city,
    groups: _.uniqBy(groups, group => group.name),
    // postcodes: postcodes.map(p => parseInt(p.code, 10)),
  };
});
