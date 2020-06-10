import dayJS from 'dayjs';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';
import {validateSchema} from '~app/server/utils';

import {schema} from './_schema';

export const meetingsByLocation = new Router();
const route = '/api/v1/meetingsByLocation';

meetingsByLocation.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.meetingsByLocationQuery} = ctx;
  await validateSchema<ts.meetingsByLocationQuery>(ctx, schema, query);

  try {
    await pg.transaction(async trx => {
      const cityRel = await pg('cities')
        .transacting(trx)
        .first()
        .where(query)
        .limit(1);

      const meetings = await pg('meetings')
        .transacting(trx)
        .where({cityId: cityRel.id})
        .where('date', '>=', dayJS().toISOString())
        .where({isDraft: false, isPrivate: false})
        .orderBy('date', 'asc')
        .limit(100);

      ctx.body = meetings;
    });
  } catch (err) {
    return ctx.throw(500, err);
  }
});
