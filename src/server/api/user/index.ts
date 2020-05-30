import commonPasswordList from 'fxa-common-password-list';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {userKeys} from '../_constants';
import {knex} from '../../db/connection';
import {getUserByQuery} from '../../queries';
import {encrypt, isValidPw, saltedHash, validateSchema} from '../../utils';
import {getSchema, patchSchema, postSchema} from './_schema';
import {tUserPostServerQuery} from './_types';

export const user = new Router();
const route = '/api/v1/user';
const table = 'users';

user.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.userQuery} = ctx;
  await validateSchema<ts.userQuery>(ctx, getSchema, query);

  const user = await getUserByQuery(ctx, query);
  const account: ts.account = await knex('accounts')
    .limit(1)
    .where({userId: query.id})
    .select(['email', 'id'])
    .first();

  ctx.body = {
    ...user,
    email: account.email,
  };
});

// user signup form basically
user.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: tUserPostServerQuery} = ctx;
  await validateSchema<tUserPostServerQuery>(ctx, postSchema, query);

  // @TODO check on account patch as well. maybe separate out into util
  if (commonPasswordList.test(query.password)
    || query.password === 'correct_horse_battery_staple') {
    ctx.throw(400, 'Please use a less common password');
  }

  // username is the only user info required to sign up. login/pw is the account table
  let userResult = [] as ts.user[];
  try {
    userResult = await knex('users')
      .insert({avatar: '1', username: query.username})
      .returning(userKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  if (!userResult || userResult.length === 0) {
    ctx.throw(500, 'Failed to insert user into db');
  }

  const {login, password} = query;
  const pwInput = password;
  let hashedPW: string = '';
  try {
    hashedPW = await saltedHash(pwInput);
  } catch (err) {
    return ctx.throw(500, err);
  }

  // save account info. on client side, we then login the new user
  try {
    await knex('accounts')
      .limit(1)
      .insert({
        login,
        email: query.email,
        isNew: true,
        password: encrypt(hashedPW),
        userId: userResult?.[0].id,
      });
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = userResult?.[0];
});

user.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.userQuery} = ctx;
  await validateSchema<ts.userQuery>(ctx, patchSchema, query);

  const {password, ...updateQuery} = query;
  const loggedInAccount = ctx?.state?.user;

  const isValidPW = await isValidPw(password, loggedInAccount.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  let updatedUser = [] as ts.user[];
  try {
    updatedUser = await knex(table)
      .limit(1)
      .where({id: query.id})
      .update(updateQuery)
      .returning(userKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = updatedUser?.[0];
});
