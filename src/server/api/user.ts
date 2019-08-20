import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';
import { isValidPw, saltAndPepper } from '../utils';

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
  // TODO this form/ajax stuff should probably just be a middleware
  const { query } = ctx;
  const { body } = ctx.request;
  const isFormSubmit = _.isEmpty(query) && !_.isEmpty(body);
  const data = isFormSubmit ? body : query;

  const pwInput: string = data.password;
  let hashedPW = pwInput;
  try {
    hashedPW = await saltAndPepper(pwInput);
  } catch (err) {
    ctx.throw(400, err);
  }

  let userResult = [];
  try {
    const { email, username } = data;
    const newUser = { email, username, password: hashedPW };
    userResult = await knex('users').insert(newUser).returning('*').limit(1);
  } catch (err) {
    ctx.throw(400, err);
  }

  if (userResult.length === 0) {
    ctx.throw(400, 'Failed to insert user into db');
  }

  if (!isFormSubmit) {
    const { password, ...safeUserForClient } = userResult[0];
    ctx.status = 200;
    ctx.body = safeUserForClient;
    return;
  }

  ctx.redirect('/login');
});

// @ts-ignore
user.patch('patchUser', '/api/v1/user', async (ctx: Koa.Context) => {
  // TODO this form/ajax stuff should probably just be a middleware
  const { query } = ctx;
  const { body } = ctx.request;
  const isFormSubmit = _.isEmpty(query) && !_.isEmpty(body);
  const {password: pwInput, ...data} = isFormSubmit ? body : query;

  let user = null;
  try {
    user = await knex('users').limit(1).where({id: ctx.query.id}).first();
  } catch (err) {
    ctx.throw('400', err);
  }

  const isValidPW = await isValidPw(pwInput, user.password);
  if (!isValidPW) return ctx.throw('400', 'Password is not correct');

  if (data.newPassword) {
    const safePW = await saltAndPepper(data.newPassword);
    data.password = safePW;
  }

  // newPassword will cause a constraint error - pull out before updating
  const {newPassword, ...updateQuery} = data;

  let updatedUser = [];
  try {
    updatedUser = await knex('users')
      .limit(1)
      .where({id: ctx.query.id})
      .update(updateQuery)
      .returning('*');
  } catch (err) {
    ctx.throw('400', err);
  }

  if (isFormSubmit) return;

  const {password, ...safeUserForClient} = updatedUser[0];
  ctx.body = {
    ...safeUserForClient,
    isAuthenticated: ctx.isAuthenticated(),
  };

});
