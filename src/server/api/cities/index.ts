import Koa from 'koa';
import Router from 'koa-router';

import {queue} from '..';
import { validateSchema } from '~app/server/utils';
import { getCitiesQuery } from '~app/server/queries';
import { schema } from './_schema';

export const cities = new Router();
const route = '/api/v1/cities';

// get ALL cities (by country, which is just the US, and region, which means state)
cities.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: {region: string}} = ctx;
  await validateSchema<{region: string}>(ctx, schema, query);
  const setTimer = `get cities ${Math.random()}`;
  console.time(setTimer);
  let cities = [];
  try {
    cities = await getCitiesQuery(query.region);
    await queue.add(cities);
  } catch (err) {
    return ctx.throw(500, err);
  }
  console.timeEnd(setTimer);
  ctx.body = cities;
});
