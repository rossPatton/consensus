import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {
  encrypt,
  filterUserInfoFromClient,
  isValidPw,
  saltedHash,
  validateSchema,
} from '../../utils';
import {userKeys} from './_constants';
import {getSchema, patchSchema, postSchema} from './_schema';
import {tUserPostServerQuery} from './_types';

export const user = new Router();
const route = '/api/v1/user';
const dataPath = 'state.locals.data';
const table = 'users';

user.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tIdQuery = _.get(ctx, dataPath, {});
  await validateSchema<tIdQuery>(ctx, getSchema, query);

  const user: tUser = await knex('users')
    .limit(1)
    .select(userKeys)
    .where({id: query.id})
    .first();

  const cleanedUser = await filterUserInfoFromClient([user]);
  ctx.body = cleanedUser[0];
});

// user signup form basically
user.post(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tUserPostServerQuery = _.get(ctx, dataPath, {});
  await validateSchema<tUserPostServerQuery>(ctx, postSchema, query);

  const pwInput = query.password;
  let hashedPW: string = '';
  try {
    hashedPW = await saltedHash(pwInput);
  } catch (err) {
    return ctx.throw(400, err);
  }

  let userResult: tUser[] = [];
  try {
    const {email, username} = query;
    userResult = await knex('users')
      .insert({email, username})
      .returning(userKeys);
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (!userResult || userResult.length === 0) {
    ctx.throw(400, 'Failed to insert user into db');
  }

  const {login} = query;
  const password = encrypt(hashedPW);
  const user = userResult[0];

  // after we update users, we save login specific stuff to the accounts table
  let userAccount: tAccount[] = [];
  try {
    userAccount = await knex('accounts')
      .limit(1)
      .insert({login, password, userId: user.id})
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (!query.isFormSubmit) {
    const body: tAccount = userAccount[0];
    ctx.body = body;
    return;
  }

  ctx.redirect('/login');
});

// TODO no-js forms only do GET/POST - figure out how to make patches work w/o js
user.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...query}: tUserQuery = _.get(ctx, dataPath, {});
  const account = _.get(ctx, 'state.user', {});

  await validateSchema<tUserQuery>(ctx, patchSchema, query);

  const isValidPW = await isValidPw(query.password, account.password);
  if (!isValidPW) {
    return ctx.throw(400, 'Password is not correct');
  }

  // password stuff will cause a constraint error - pull out before updating
  const {password, ...updateQuery} = query;

  let updatedUser: tUser[] = [];
  try {
    updatedUser = await knex(table)
      .limit(1)
      .where({id: query.id})
      .update(updateQuery)
      .returning(userKeys);
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (isFormSubmit) return;
  ctx.body = updatedUser[0];
});
