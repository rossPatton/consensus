import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { pg } from '~app/server/db/connection';
import { getCitiesQuery } from '~app/server/queries';
import { validateSchema } from '~app/server/utils';

import { queue } from '..';
import { schema } from './_schema';

export const region = new Router();
const route = '/api/v1/region';

region.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.directoryParams} = ctx;
  await validateSchema<ts.directoryParams>(ctx, schema, query);

  try {
    await queue.add(() => pg.transaction(async trx => {
      const region = await pg('regions')
        .transacting(trx)
        .limit(1)
        .where({
          countryId: 1,
          code: query.regionCode,
        })
        .first();

      const citiesResp = await pg('cities')
        .transacting(trx)
        .where({
          countryId: 1,
          regionId: region.id,
        })
        .orderBy('name', 'asc');

      const cities = await Promise.all(_.uniqBy(citiesResp, city => city.name));
      ctx.body = {
        ...region,
        cities,
      };
    }));
  } catch (err) {
    return ctx.throw(500, err);
  }

});
