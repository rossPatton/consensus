import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { pg } from '~app/server/db/connection';

import { validateSchema } from '../../utils';
import { schema } from './_schema';

export const region = new Router();
const route = '/api/v1/region';

region.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.directoryParams} = ctx;
  await validateSchema<ts.directoryParams>(ctx, schema, query);

  // @TODO reimplment once there are more countries
  // let country = {} as ts.country;
  // try {
  //   country = await pg('countries')
  //     .limit(1)
  //     .where({code: countryCode})
  //     .first();
  // } catch (err) {
  //   return ctx.throw(500, err);
  // }

  let region = {} as ts.region;
  try {
    region = await pg('regions')
      .limit(1)
      .where({
        countryId: 1,
        code: query.regionCode,
      })
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  let cities = [] as ts.city[];
  try {
    cities = await pg('cities')
      .where({
        countryId: 1,
        regionId: region.id,
      })
      .orderBy('name', 'asc');
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = {
    ...region,
    cities: _.uniqBy(cities, city => city.name),
  };
});
