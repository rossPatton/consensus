import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';
import {getUserByQuery} from '~app/server/queries';
import {validateSchema} from '~app/server/utils';

import {userKeys} from '../_constants';
import {getSchema, patchSchema, postSchema} from './_schema';
import {tUserPostServerQuery} from './_types';

export const user = new Router();
const route = '/api/v1/user';
const table = 'users';

const errorMessage = 'Failed to insert user into database. Your email and username must be unique, and the token must match the one sent to you.';

user.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.idQuery} = ctx;
  await validateSchema<ts.idQuery>(ctx, getSchema, query);
  try {
    await pg(table)
      .limit(1)
      .where({id: query.id})
      .del();
  } catch (err) {
    return ctx.throw(500, err);
  }
  ctx.body = {id: query.id};
});

user.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.userQuery} = ctx;
  await validateSchema<ts.userQuery>(ctx, getSchema, query);
  const user = await getUserByQuery(ctx, query);
  ctx.body = user;
});

user.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.userQuery} = ctx;
  await validateSchema<ts.userQuery>(ctx, patchSchema, query);

  const loggedInAccount = ctx?.state?.user;
  if (!loggedInAccount) return ctx.throw(400, 'Must be logged in');

  let updatedUser = [] as ts.user[];
  try {
    updatedUser = await pg(table)
      .limit(1)
      .where({id: query.id})
      .update(query)
      .returning(userKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = updatedUser?.[0];
});

// user signup form basically
user.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: tUserPostServerQuery} = ctx;
  await validateSchema<tUserPostServerQuery>(ctx, postSchema, query);

  // username is the only user info required to sign up. login/pw is the account table
  let userResult = [] as ts.user[];
  try {
    userResult = await pg('users')
      .insert({avatar: '1', ...query})
      .returning(userKeys);
  } catch (err) {
    return ctx.throw(500, errorMessage);
  }

  if (!userResult || userResult.length === 0) {
    ctx.throw(500, errorMessage);
  }

  ctx.body = userResult?.[0];
});
