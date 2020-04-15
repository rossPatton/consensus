import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../../db/connection';
import { validateSchema } from '../../utils';
import { schema } from './_schema';

export const cities = new Router();
const route = '/api/v1/cities';

// get ALL cities (by country, which is just the US)
cities.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tDirectoryParams = _.get(ctx, 'state.locals.data', {});
  await validateSchema<tDirectoryParams>(ctx, schema, query);

  let allCities = [] as tCity[];
  try {
    allCities = await knex('cities').where({
      ...query,
      countryId: 1,
    });
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = allCities;
});
