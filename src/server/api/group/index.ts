import Koa from 'koa';
import Router from 'koa-router';

import {groupKeys} from '../_constants';
import {knex} from '../../db/connection';
import {encrypt, isValidPw, saltedHash, validateSchema} from '../../utils';
import {patchSchema, postSchema, schema} from './_schema';

export const group = new Router();
const route = '/api/v1/group';
const table = 'groups';

group.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.getGroupQuery} = ctx;
  await validateSchema<ts.getGroupQuery>(ctx, schema, query);

  let group = {} as ts.group;
  try {
    group = await knex(table)
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

  const loggedInAccount: ts.account = ctx?.state?.user || {};
  const {password, ...updateQuery} = query;

  const isValidPW = await isValidPw(password, loggedInAccount.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  let updatedGroup = [] as ts.group[];
  try {
    updatedGroup = await knex(table)
      .limit(1)
      .where({id: updateQuery.id})
      .update(updateQuery)
      .returning(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = updatedGroup?.[0];
});

group.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.groupUpsertQuery} = ctx;
  await validateSchema<ts.groupUpsertQuery>(ctx, postSchema, query);

  const {email, login, password, ...groupToInsert} = query;

  // create the group first =>
  let newGroupReturning = [] as ts.group[];
  try {
    newGroupReturning = await knex(table)
      .insert({avatar: '2', ...groupToInsert})
      .returning('*');
  } catch (err) {
    return ctx.throw(500, err);
  }

  let hashedPW = null;
  try {
    hashedPW = await saltedHash(query.password);
  } catch (err) {
    return ctx.throw(500, err);
  }

  const newGroup = newGroupReturning?.[0];

  // then save the cooresponding account info for login
  try {
    await knex('accounts').insert({
      email,
      login: query.login,
      groupId: newGroup.id,
      password: encrypt(hashedPW),
    });
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = newGroup;
});
