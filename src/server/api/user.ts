import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';
import { encrypt, isValidPw, saltedHash } from '../utils';

export const user = new Router();

// @ts-ignore
user.get('getUser', '/api/v1/user', async (ctx: Koa.Context) => {
  try {
    const user: tUser = await knex('users').where(ctx.query).limit(1).first();
    const { password, ...safeUserForClient } = user;
    ctx.body = safeUserForClient;
  } catch (err) {
    ctx.throw('400', err);
  }
});

// user signup form basically
// @ts-ignore
user.post('postUser', '/api/v1/user', async (ctx: Koa.Context) => {
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
    const { email, username } = data;
    const newUser = { email, username, password: encrypt(hashedPW) };
    userResult = await knex('users').insert(newUser).returning('*').limit(1);
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (userResult.length === 0) {
    ctx.throw(400, 'Failed to insert user into db');
  }

  if (!data.isFormSubmit) {
    const { password, ...safeUserForClient } = userResult[0];
    ctx.status = 200;
    ctx.body = safeUserForClient;
    return;
  }

  ctx.redirect('/login');
});

// TODO no-js forms only do GET/POST - figure out how to make patches work w/o js
// @ts-ignore
user.patch('patchUser', '/api/v1/user', async (ctx: Koa.Context) => {
  const {data} = ctx.state.locals;

  let user = null;
  try {
    user = await knex('users').limit(1).where({id: data.id}).first();
  } catch (err) {
    ctx.throw('400', err);
  }

  const isValidPW = await isValidPw(data.password, user.password);
  if (!isValidPW) return ctx.throw('400', 'Password is not correct');

  if (data.newPassword) {
    const safePW = await saltedHash(data.newPassword);
    data.password = encrypt(safePW);
  }

  // newPassword will cause a constraint error - pull out before updating
  const {newPassword, ...updateQuery} = data;

  let updatedUser = [];
  try {
    updatedUser = await knex('users')
      .limit(1)
      .where({id: data.id})
      .update(updateQuery)
      .returning('*');
  } catch (err) {
    ctx.throw('400', err);
  }

  if (data.isFormSubmit) return;

  const {password, ...safeUserForClient} = updatedUser[0];
  ctx.body = {
    ...safeUserForClient,
    isAuthenticated: ctx.isAuthenticated(),
  };

});
