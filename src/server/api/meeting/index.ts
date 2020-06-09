import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';
import {getMeetingByQuery} from '~app/server/queries';
import {validateSchema} from '~app/server/utils';

import {queue} from '..';
import {getSchema, upsertSchema} from './_schema';

const route = '/api/v1/meeting';
export const meeting = new Router();

meeting.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.getMeetingQuery} = ctx;
  await validateSchema<ts.getMeetingQuery>(ctx, getSchema, query);
  ctx.body = await getMeetingByQuery(ctx, query);
});

meeting.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query} = ctx;
  await validateSchema<Partial<ts.meeting>>(ctx, upsertSchema, query);
  const {id, ...patch} = query;

  try {
    const meeting: ts.meeting[] = await queue.add(() =>
      pg.transaction(async trx => pg('meetings')
        .transacting(trx)
        .limit(1)
        .where({id})
        .update(patch)
        .returning('*')
        .then(trx.commit)
        .catch(trx.rollback),
      ),
    );

    ctx.body = meeting?.[0];
  } catch (err) {
    ctx.throw(500, err);
  }
});

meeting.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: Partial<ts.meeting>} = ctx;
  await validateSchema<Partial<ts.meeting>>(ctx, upsertSchema, query);
  const {id, ...meeting} = query;

  try {
    const newMeeting: ts.meeting[] = await queue.add(() =>
      pg.transaction(async trx => pg('meetings')
        .transacting(trx)
        .insert(meeting)
        .limit(1)
        .returning('*')
        .then(trx.commit)
        .catch(trx.rollback),
      ),
    );

    ctx.body = newMeeting?.[0];
  } catch (err) {
    ctx.throw(500, err);
  }
});
