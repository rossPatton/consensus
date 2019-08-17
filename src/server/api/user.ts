import bcrypt from 'bcrypt';
import { sha256 } from 'js-sha256';
import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';

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
    // add a little pepper to the salt - hard coded server key for extra security
    const { PEPPER } = process.env;

    // bycrypt truncates long inputs - doing it this way ensures no truncation
    const sha = sha256(ctx.query.password + PEPPER);

    // 10 rounds before applying the salt to our peppered sha
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(sha, salt);

    const newUser = { ...ctx.query, password: hash };
    const userQuery = await knex('users').insert(newUser).returning('*');
    const { password, ...safeUserForClient } = userQuery[0];

    ctx.body = safeUserForClient;
  } catch (err) {
    ctx.throw('400', err);
  }
});

// @ts-ignore
user.patch('patchUser', '/api/v1/user', async (ctx: Koa.Context) => {
  try {
    const { id, ...theRestOfTheQuery }: tUser = ctx.query;

    const query = {
      ...theRestOfTheQuery,
      updated_at: knex.fn.now(),
    };

    if (query.password) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(theRestOfTheQuery.password, salt);
      query.password = hash;
    }

    const updatedUser = await knex('users')
      .where({ id })
      .update(query)
      .returning('*');

    const { password, ...safeUserForClient } = updatedUser[0];

    ctx.body = {
      ...safeUserForClient,
      isAuthenticated: ctx.isAuthenticated(),
    };
  } catch (err) {
    ctx.throw('400', err);
  }
});
