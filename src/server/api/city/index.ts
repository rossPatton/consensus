import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { pg } from '~app/server/db/connection';
import { validateSchema } from '~app/server/utils';
import { deSlugify } from '~app/utils';

import { schema } from './_schema';

export const city = new Router();
const route = '/api/v1/city';

city.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.directoryParams} = ctx;
  await validateSchema<ts.directoryParams>(ctx, schema, query);

  const { city: citySlug, regionCode} = query;
  const cityName = deSlugify(citySlug);

  try {
    await pg.transaction(async trx => {
      const region = await pg('regions')
        .transacting(trx)
        .limit(1)
        .where({
          countryId: 1,
          code: regionCode,
        })
        .first();

      const city = await pg('cities')
        .transacting(trx)
        .limit(1)
        .where({
          countryId: 1,
          regionId: region.id,
          name: cityName,
        })
        .first();

      const groups = await pg('groups')
        .transacting(trx)
        .where({
          cityId: city.id,
          countryId: 1,
          regionId: region.id,
        })
        .andWhereNot({type: 'hidden'})
        .orderBy('name', 'asc');

      ctx.body = {
        ...city,
        groups: _.uniqBy(groups, group => group.name),
      };
    });
  } catch (err) {
    return ctx.throw(500, err);
  }
});
