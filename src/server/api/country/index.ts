import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { pg } from '~app/server/db/connection';

import { queue } from '..';
import { validateSchema } from '../../utils';
import { schema } from './_schema';

export const country = new Router();
const route = '/api/v1/country';

country.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.directoryParams} = ctx;
  await validateSchema<ts.directoryParams>(ctx, schema, query);

  let country = {} as ts.country;
  try {
    await queue.add(() => pg.transaction(async trx => pg('countries')
      .transacting(trx)
      .limit(1)
      .where({id: 1})
      .first()
      .then(countryResp => {
        country = countryResp;
        return pg('regions')
          .transacting(trx)
          .where({countryId: 1})
          .orderBy('name', 'asc');
      })
      .then(regions => {
        ctx.body = {
          ...country,
          regions: _.uniqBy(regions, region => region.name),
        };
        return null;
      }),
    ));
  } catch (err) {
    return ctx.throw(500, err);
  }
});
