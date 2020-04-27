import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../../db/connection';
import { validateSchema } from '../../utils';
import { schema } from './_schema';

export const country = new Router();
const route = '/api/v1/country';

country.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: ts.directoryParams = _.get(ctx, 'state.locals.data', {});
  await validateSchema<ts.directoryParams>(ctx, schema, query);

  let country = {} as ts.country;
  try {
    country = await knex('countries')
      .limit(1)
      .where({code: query.countryCode})
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  if (!country || (country instanceof Array && country.length === 0)) {
    ctx.status = 204;
  }

  let regions: ts.region[];
  try {
    regions = await knex('regions')
      .where({countryId: country.id})
      .orderBy('name', 'asc');
  } catch (err) {
    return ctx.throw(500, err);
  }

  if (!regions ||
    (regions instanceof Array && regions.length === 0)) {
    ctx.status = 204;
  }

  ctx.body = {
    ...country,
    regions: _.uniqBy(regions, region => region.name),
  };
});
