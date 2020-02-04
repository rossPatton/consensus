import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { deSlugify } from '../../../utils';
import { knex } from '../../db/connection';
import { schema } from './_schema';

export const city = new Router();
const route = '/api/v1/city';

city.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tDirectoryParams = _.get(ctx, 'state.locals.data', {});

  try {
    await schema.validateAsync(query);
  } catch (err) {
    const message = _.get(err, 'details[0].message', 'Bad Request');
    return ctx.throw(400, message);
  }

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
      // exclude private-only orgs
      .whereNot({
        vetting: 'private',
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
