import Koa from 'koa';
import Router from 'koa-router';

import {pg} from '~app/server/db/connection';
import {validateSchema} from '~app/server/utils';

import {groupKeys} from '../_constants';
import {patchSchema, postSchema, schema} from './_schema';

export const group = new Router();
const route = '/api/v1/group';
const table = 'groups';

group.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const loggedInAccount = ctx?.state?.user;
  if (!loggedInAccount) return ctx.throw(401, 'Must be logged in');

  try {
    await pg.transaction(async trx => pg(table)
      .transacting(trx)
      .limit(1)
      .where({id: loggedInAccount.id})
      .first()
      .del()
      .then(trx.commit)
      .catch(trx.rollback),
    );

    ctx.body = {ok: true};
  } catch (err) {
    return ctx.throw(500, err);
  }
});

group.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.getGroupQuery} = ctx;
  await validateSchema<ts.getGroupQuery>(ctx, schema, query);

  try {
    const group = await pg(table)
      .limit(1)
      .where(query)
      .first()
      .returning(groupKeys);

    ctx.body = group;
  } catch (err) {
    return ctx.throw(500, err);
  }
});

group.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.groupUpsertQuery} = ctx;
  await validateSchema<ts.groupUpsertQuery>(ctx, patchSchema, query);

  const loggedInAccount = ctx?.state?.user;
  if (!loggedInAccount) return ctx.throw(401, 'Must be logged in');

  try {
    await pg.transaction(async trx => pg(table)
      .transacting(trx)
      .limit(1)
      .where({id: loggedInAccount.id})
      .update(query)
      .returning('*')
      .then((updatedGroup: ts.group[]) => {
        ctx.login(updatedGroup?.[0]);
        ctx.body = updatedGroup?.[0];
        return null;
      })
      .then(trx.commit)
      .catch(trx.rollback),
    );
  } catch (err) {
    return ctx.throw(500, err);
  }
});

group.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.groupUpsertQuery} = ctx;
  await validateSchema<ts.groupUpsertQuery>(ctx, postSchema, query);

  try {
    await pg.transaction(async trx => pg(table)
      .transacting(trx)
      .insert({avatar: '2', ...query})
      .returning(groupKeys)
      .then(newGroup => {
        ctx.body = newGroup?.[0];
        return null;
      })
      .then(trx.commit)
      .catch(trx.rollback),
    );
  } catch (err) {
    return ctx.throw(500, err);
  }
});
