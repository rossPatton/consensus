import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {encrypt, isValidPw, saltedHash} from '../../utils';
import {getSchema, patchSchema, postSchema} from './_schema';
import {tUserPatchServerQuery, tUserPostServerQuery} from './_types';

export const user = new Router();
const route = '/api/v1/user';
const dataPath = 'state.locals.data';
const table = 'users';
const errorPath = 'details[0].message';
const errorMsg = 'Bad Request';

user.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});

  try {
    await getSchema.validateAsync<{id: number}>(query);
  } catch (err) {
    const message = _.get(err, errorPath, errorMsg);
    return ctx.throw(400, message);
  }

  ctx.body = await knex('users')
    .limit(1)
    .where({id: query.id})
    .first();
});

// user signup form basically
user.post(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tUserPostServerQuery = _.get(ctx, dataPath, {});

  try {
    await postSchema.validateAsync<tUserPostServerQuery>(query);
  } catch (err) {
    const message = _.get(err, errorPath, errorMsg);
    return ctx.throw(400, message);
  }

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
      .returning('*');
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
    ctx.body = userAccount[0];
    return;
  }

  ctx.redirect('/login');
});

// TODO no-js forms only do GET/POST - figure out how to make patches work w/o js
user.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tUserPatchServerQuery = _.get(ctx, dataPath, {});
  const account = _.get(ctx, 'state.user', {});

  try {
    await patchSchema.validateAsync<tUserPatchServerQuery>(query);
  } catch (err) {
    const message = _.get(err, errorPath, errorMsg);
    return ctx.throw(400, message);
  }

  const isValidPW = await isValidPw(query.password, account.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  if (query.newPassword) {
    const safePW = await saltedHash(query.newPassword);
    query.password = encrypt(safePW);
  }

  // password stuff will cause a constraint error - pull out before updating
  const {isFormSubmit, newPassword, password, ...updateQuery} = query;

  let updatedUser: tUser[] = [];
  try {
    updatedUser = await knex(table)
      .limit(1)
      .where({id: query.id})
      .update(updateQuery)
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (isFormSubmit) return;
  ctx.body = updatedUser[0];
});
