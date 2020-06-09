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

  let region = {} as ts.region;
  try {
    await pg.transaction(async trx => pg('regions')
      .transacting(trx)
      .limit(1)
      .where({
        countryId: 1,
        code: query.regionCode,
      })
      .first()
      .then(regionResp => {
        region = regionResp;
        return pg('cities')
          .transacting(trx)
          .where({
            countryId: 1,
            regionId: regionResp.id,
          })
          .orderBy('name', 'asc');
      })
      .then(cities => {
        ctx.body = {
          ...region,
          cities: _.uniqBy(cities, city => city.name),
        };
      })
    );
  } catch (err) {
    return ctx.throw(500, err);
  }

});
