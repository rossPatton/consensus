import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {userKeys} from '../_constants';
import {knex} from '../../db/connection';
import {getUserByQuery} from '../../queries';
import {validateSchema} from '../../utils';
import {getSchema, patchSchema, postSchema} from './_schema';
import {tUserPostServerQuery} from './_types';

export const user = new Router();
const route = '/api/v1/user';
const table = 'users';

const errorMessage = 'Failed to insert user into database. Your email and username must be unique, and the token must match the one sent to you.';

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
    updatedUser = await knex(table)
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
    userResult = await knex('users')
      .insert({avatar: '1', ...query})
      .returning(userKeys);
  } catch (err) {
    return ctx.throw(500, errorMessage);
  }

  if (!userResult || userResult.length === 0) {
    ctx.throw(500, errorMessage);
  }

  // const {login, password} = query;
  // const pwInput = password;
  // let hashedPW: string = '';
  // try {
  //   hashedPW = await saltedHash(pwInput);
  // } catch (err) {
  //   return ctx.throw(500, err);
  // }

  // save account info. on client side, we then login the new user
  // try {
  //   await knex('accounts')
  //     .limit(1)
  //     .insert({
  //       login,
  //       email: query.email,
  //       showOnboarding: true,
  //       password: encrypt(hashedPW),
  //       userId: userResult?.[0].id,
  //     });
  // } catch (err) {
  //   return ctx.throw(500, err);
  // }

  ctx.body = userResult?.[0];
});
