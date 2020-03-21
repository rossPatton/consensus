import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../../db/connection';

export const cities = new Router();
const route = '/api/v1/cities';

// get ALL cities (by country, which is just the US)
cities.get(route, async (ctx: Koa.ParameterizedContext) => {
  let allCities = [] as tCity[];
  try {
    allCities = await knex('cities').where({countryId: 1});
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = allCities;
});
