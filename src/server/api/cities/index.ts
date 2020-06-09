import Koa from 'koa';
import Router from 'koa-router';

import { getCitiesQuery } from '~app/server/queries';
import { validateSchema } from '~app/server/utils';

import { queue } from '..';
import { schema } from './_schema';

export const cities = new Router();
const route = '/api/v1/cities';

// get ALL cities (by country, which is just the US, and region, which means state)
cities.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: {region: string}} = ctx;
  await validateSchema<{region: string}>(ctx, schema, query);
  try {
    ctx.body = await queue.add(() => getCitiesQuery(query.region));
  } catch (err) {
    return ctx.throw(500, err);
  }
});
