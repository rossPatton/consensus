import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';
import {getUserByQuery} from '../queries';
import {encrypt, isValidPw, saltedHash} from '../utils';

export const user = new Router();
const route = '/api/v1/user';
const table = 'users';

user.get(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, 'state.locals.data', {});
  ctx.body = await getUserByQuery(ctx, data);
});

// user signup form basically
user.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {data} = ctx.state.locals;
  const pwInput = data.password;

  let hashedPW: string;
  try {
    hashedPW = await saltedHash(pwInput);
  } catch (err) {
    return ctx.throw(400, err);
  }

  let userResult: tUser[];
  try {
    const {email, username} = data;
    const newUser = { email, username };
    userResult = await knex('users').insert(newUser).returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (userResult.length === 0) {
    ctx.throw(400, 'Failed to insert user into db');
  }

  const {login} = data;
  const password = encrypt(hashedPW);
  const user = userResult[0];

  // after we update users, we save login specific stuff to the accounts table
  let userAccount: tAccount[];
  try {
    userAccount = await knex('accounts')
      .insert({login, password, userId: user.id})
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (!data.isFormSubmit) {
    ctx.body = userAccount[0];
    return;
  }

  ctx.redirect('/login');
});

// TODO no-js forms only do GET/POST - figure out how to make patches work w/o js
user.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, 'state.locals.data', {});
  const account = _.get(ctx, 'state.user', {});

  const isValidPW = await isValidPw(data.password, account.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  if (data.newPassword) {
    const safePW = await saltedHash(data.newPassword);
    data.password = encrypt(safePW);
  }

  // password stuff will cause a constraint error - pull out before updating
  const {isFormSubmit, newPassword, password, ...updateQuery} = data;

  let updatedUser: tUser[];
  try {
    updatedUser = await knex(table)
      .limit(1)
      .where({id: data.id})
      .update(updateQuery)
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (isFormSubmit) return;

  const body = updatedUser[0];
  ctx.body = body;
});
