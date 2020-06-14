import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { pg } from '~app/server/db/connection';

import { validateSchema } from '../../utils';
import { schema } from './_schema';

export const country = new Router();
const route = '/api/v1/country';

country.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.directoryParams} = ctx;
  await validateSchema<ts.directoryParams>(ctx, schema, query);

  try {
    await pg.transaction(async trx => {
      const country = await pg('countries')
        .transacting(trx)
        .limit(1)
        .where({id: 1})
        .first();

      const regions = await pg('regions')
        .transacting(trx)
        .where({countryId: 1})
        .orderBy('name', 'asc');

      const body = {
        ...country,
        regions: await Promise.all(_.uniqBy(regions, region => region.name)),
      };

      ctx.body = body;
    });
  } catch (err) {
    return ctx.throw(500, err);
  }
});
