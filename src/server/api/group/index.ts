import Koa from 'koa';
import Router from 'koa-router';

import {queue} from '..';
import {groupKeys} from '../_constants';
import {pg} from '../../db/connection';
import {validateSchema} from '../../utils';
import {patchSchema, postSchema, schema} from './_schema';

export const group = new Router();
const route = '/api/v1/group';
const table = 'groups';

group.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const loggedInAccount = ctx?.state?.user;
  if (!loggedInAccount) return ctx.throw(401, 'Must be logged in');

  try {
    await queue.add(() => pg.transaction(async trx => pg(table)
      .transacting(trx)
      .limit(1)
      .where({id: loggedInAccount.id})
      .first()
      .del()
      .then(trx.commit)
      .catch(trx.rollback),
    ));
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = {ok: true};
});

group.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.getGroupQuery} = ctx;
  await validateSchema<ts.getGroupQuery>(ctx, schema, query);

  try {
    const group = await queue.add(() => pg(table)
      .limit(1)
      .where(query)
      .first()
      .select(groupKeys),
    );

    ctx.body = group;
  } catch (err) {
    return ctx.throw(500, err);
  }
});

group.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.groupUpsertQuery} = ctx;
  await validateSchema<ts.groupUpsertQuery>(ctx, patchSchema, query);

  try {
    const updatedGroup: ts.group[] = await queue.add(() =>
      pg.transaction(async trx => pg(table)
        .transacting(trx)
        .limit(1)
        .where({id: query.id})
        .update(query)
        .returning(groupKeys)
        .then(trx.commit)
        .catch(trx.rollback),
      ));

    ctx.body = updatedGroup?.[0];
  } catch (err) {
    return ctx.throw(500, err);
  }
});

group.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.groupUpsertQuery} = ctx;
  await validateSchema<ts.groupUpsertQuery>(ctx, postSchema, query);

  try {
    const newGroup: ts.group[] = await queue.add(() =>
      pg.transaction(async trx => pg(table)
        .transacting(trx)
        .insert({avatar: '2', ...query})
        .returning(groupKeys)
        .then(trx.commit)
        .catch(trx.rollback),
      ));

    ctx.body = newGroup?.[0];
  } catch (err) {
    return ctx.throw(500, err);
  }
});
