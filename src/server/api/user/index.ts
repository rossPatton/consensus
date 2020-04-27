import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {userKeys} from '../_constants';
import {knex} from '../../db/connection';
import {
  encrypt,
  isValidPw,
  saltedHash,
  sha256,
  validateSchema,
} from '../../utils';
import {getSchema, patchSchema, postSchema} from './_schema';
import {tUserPostServerQuery} from './_types';

export const user = new Router();
const route = '/api/v1/user';

const table = 'users';

user.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: ts.idQuery = ctx?.state?.locals?.data;
  await validateSchema<ts.idQuery>(ctx, getSchema, query);

  const user: ts.user = await knex('users')
    .limit(1)
    .select(userKeys)
    .where({id: query.id})
    .first();

  const account: ts.account = await knex('accounts')
    .limit(1)
    .where({userId: query.id})
    .select(['id'])
    .first();

  let emails = [] as {email: string}[];
  if (!account.privateEmail) {
    emails = await knex('accounts_emails')
      .where({id: account.id})
      .select(['email']);
  }

  ctx.body = {
    ...user,
    emails: emails.map(obj => obj.email),
  };
});

// user signup form basically
user.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...query}: tUserPostServerQuery = ctx?.state?.locals?.data;
  await validateSchema<tUserPostServerQuery>(ctx, postSchema, query);

  // since we don't require any user info to signup, just insert a blank new row
  let userResult = [] as ts.user[];
  try {
    userResult = await knex('users')
      .insert({})
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

  // save account info, then login user (either by redirect or client side login)
  try {
    await knex('accounts')
      .limit(1)
      .insert({
        login,
        isNew: true,
        password: encrypt(hashedPW),
        userId: userResult?.[0].id,
      });
  } catch (err) {
    return ctx.throw(500, err);
  }

  if (isFormSubmit) return ctx.redirect('/login');
  ctx.body = userResult?.[0];
});

// TODO no-js forms only do GET/POST - implement upsert
user.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...query}: ts.userQuery = ctx?.state?.locals?.data;
  await validateSchema<ts.userQuery>(ctx, patchSchema, query);

  const {avatarEmail, password, ...updateQuery} = query;
  const loggedInAccount = _.get(ctx, 'state.user', {});

  const isValidPW = await isValidPw(password, loggedInAccount.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  if (typeof avatarEmail === 'string') {
    updateQuery.avatarHash = sha256(avatarEmail);
  }

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

  if (isFormSubmit) return;
  ctx.body = updatedUser?.[0];
});
