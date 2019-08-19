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
  const { id, password, ...theRestOfTheQuery }: tUser = ctx.query;

  const query = {
    ...theRestOfTheQuery,
    updatedAt: knex.fn.now(),
  };

  console.log('query before hash => ', query);

  if (query.newPassword) {
    const safePW = await saltAndPepper(query.newPassword);
    query.password = safePW;
  }

  console.log('query after hash => ', query);

  try {
    const updatedUser = await knex('users')
      .where({id})
      .update(query)
      .returning('*');

    const {password, ...safeUserForClient} = updatedUser[0];

    console.log('updatedUser[0] => ', updatedUser[0]);

    ctx.body = {
      ...safeUserForClient,
      isAuthenticated: ctx.isAuthenticated(),
    };
  } catch (err) {
    ctx.throw('400', err);
  }
});
