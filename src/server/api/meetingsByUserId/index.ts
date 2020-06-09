import dayJS from 'dayjs';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';
import {getRSVPsByUserId} from '~app/server/queries';
import {validateSchema} from '~app/server/utils';

import {queue} from '..';
import {schema} from './_schema';
import {tMeetingsByUserServerQuery} from './_types';

export const meetingsByUserId = new Router();
const route = '/api/v1/meetingsByUserId';

meetingsByUserId.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: tMeetingsByUserServerQuery} = ctx;
  await validateSchema(ctx, schema, query);

  try {
    await queue.add(() => pg.transaction(async trx => {
      const userRSVPs = await getRSVPsByUserId(trx, ctx, query.userId);
      const mappedIds = await Promise.all(_.uniq(
        userRSVPs.map(async idSet => idSet.meetingId),
      ));

      const meetings = await pg('meetings')
        .transacting(trx)
        .whereIn('id', mappedIds)
        .andWhere('date', '>=', dayJS().toISOString())
        .andWhere({isDraft: false})
        .orderBy('date', 'asc');

      ctx.body = meetings;
    }));
  } catch (err) {
    return ctx.throw(500, err);
  }
});
