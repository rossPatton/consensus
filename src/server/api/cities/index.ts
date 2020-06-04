import Koa from 'koa';
import Router from 'koa-router';

import { pg } from '~app/server/db/connection';

import { validateSchema } from '../../utils';
import { schema } from './_schema';

export const cities = new Router();
const route = '/api/v1/cities';

// get ALL cities (by country, which is just the US)
cities.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.directoryParams} = ctx;
  await validateSchema<ts.directoryParams>(ctx, schema, query);

  let allCities = [] as ts.city[];
  try {
    allCities = await pg('cities').where({
      ...query,
      countryId: 1,
    });
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = allCities;
});
