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
  try {
    const safePW = await saltAndPepper(ctx.query.password);
    const newUser = { ...ctx.query, password: safePW };
    const userQuery = await knex('users').insert(newUser).returning('*');
    const { password, ...safeUserForClient } = userQuery[0];
    ctx.body = safeUserForClient;
  } catch (err) {
    ctx.throw('400', err);
  }
});

// @ts-ignore
user.patch('patchUser', '/api/v1/user', async (ctx: Koa.Context) => {
  let user = null;
  try {
    user = await knex('users').limit(1).where({id: ctx.query.id}).first();
  } catch (err) {
    ctx.throw('400', err);
  }

  if (!isValidPw(ctx.query.password, user.password)) {
    return ctx.throw('400', 'Password is not correct');
  }

  if (ctx.query.newPassword) {
    const safePW = await saltAndPepper(ctx.query.newPassword);
    ctx.query.password = safePW;
  }

  const {newPassword, ...updateQuery} = ctx.query;

  let updatedUser = null;
  try {
    updatedUser = await knex('users')
      .limit(1)
      .where({id: ctx.query.id})
      .update(updateQuery)
      .returning('*');

    const {password, ...safeUserForClient} = updatedUser[0];

    ctx.body = {
      ...safeUserForClient,
      isAuthenticated: ctx.isAuthenticated(),
    };
  } catch (err) {
    ctx.throw('400', err);
  }
});
