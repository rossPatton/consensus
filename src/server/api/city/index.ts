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
  const query: tDirectoryParams = _.get(ctx, 'state.locals.data', {});

  await validateSchema<tDirectoryParams>(ctx, schema, query);

  const {
    city: citySlug = '',
    country: countryCode = '',
    region: regionCode = '',
  } = query;

  let country = {} as tCountry;
  try {
    country = await knex('countries')
      .limit(1)
      .where({code: countryCode})
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  let region = {} as tRegion;
  try {
    region = await knex('regions')
      .limit(1)
      .where({
        country: country.id,
        code: regionCode,
      })
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  const cityName = deSlugify(citySlug);
  let city = {} as tCity;
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
    return ctx.throw(500, err);
  }

  let postcodes = [] as {code: string}[];
  if (city.id) {
    try {
      postcodes = await knex('postcodes').where({city: city.id}).select('code');
    } catch (err) {
      return ctx.throw(500, err);
    }
  }

  let orgs = [] as tGroup[];
  try {
    orgs = await knex('orgs')
      .where({
        cityId: city.id,
        countryId: country.id,
        regionId: region.id,
      })
      // exclude invite-only orgs from results
      .whereNot({
        type: 'hidden',
      })
      .orderBy('name');
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = {
    ...city,
    orgs: _.uniqBy(orgs, org => org.name),
    postcodes: postcodes.map(p => parseInt(p.code, 10)),
  };
});
