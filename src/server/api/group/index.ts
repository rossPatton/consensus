import Koa from 'koa';
import Router from 'koa-router';

import {groupKeys} from '../_constants';
import {pg} from '../../db/connection';
import {validateSchema} from '../../utils';
import {patchSchema, postSchema, schema} from './_schema';

export const group = new Router();
const route = '/api/v1/group';
const table = 'groups';

group.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.getGroupQuery} = ctx;
  await validateSchema<ts.getGroupQuery>(ctx, schema, query);

  let group = {} as ts.group;
  try {
    group = await pg(table)
      .limit(1)
      .where(query)
      .first()
      .select(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = group;
});

group.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.groupUpsertQuery} = ctx;
  await validateSchema<ts.groupUpsertQuery>(ctx, patchSchema, query);

  let updatedGroup = [] as ts.group[];
  try {
    updatedGroup = await pg(table)
      .limit(1)
      .where({id: query.id})
      .update(query)
      .returning(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = updatedGroup?.[0];
});

group.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.groupUpsertQuery} = ctx;
  await validateSchema<ts.groupUpsertQuery>(ctx, postSchema, query);

  // create the group first =>
  let newGroupReturning = [] as ts.group[];
  try {
    newGroupReturning = await pg(table)
      .insert({avatar: '2', ...query})
      .returning('*');
  } catch (err) {
    return ctx.throw(500, err);
  }

  const newGroup = newGroupReturning?.[0];
  ctx.body = newGroup;
});
