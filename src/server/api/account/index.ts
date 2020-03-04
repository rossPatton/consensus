import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';
import {Mutable} from 'utility-types';

import {knex} from '../../db/connection';
import {encrypt, isValidPw, saltedHash, validateSchema} from '../../utils';
import {deleteSchema, schema} from './_schema';

export const account = new Router();
const route = '/api/v1/account';
const table = 'accounts';

account.delete(route, async (ctx: Koa.ParameterizedContext) => {
  // TODO add query back, require a password to set deletion timer
  // also set deletion timer
  const session: tAccount = _.get(ctx, 'state.user', {});
  await validateSchema<Mutable<tIdQuery>>(ctx, deleteSchema, {id: session.id});

  // const isValidPW = await isValidPw(query.password, loggedInAccount.password);
  // if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  try {
    await knex(table)
      .limit(1)
      .where({id: session.id})
      .delete();
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = {ok: true};
});

// TODO implement a POST route here as an upsert
account.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const query: Mutable<tAccountQuery> = _.get(ctx, 'state.locals.data', {});
  const loggedInAccount: tAccount = _.get(ctx, 'state.user', {});

  try {
    await schema.validateAsync(query);
  } catch (err) {
    const message = _.get(err, 'details[0].message', 'Bad Request');
    return ctx.throw(400, message);
  }

  const isValidPW = await isValidPw(query.password, loggedInAccount.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  if (query.newPassword) {
    const safePW = await saltedHash(query.newPassword);
    query.password = encrypt(safePW);
  }

  // password stuff will cause a constraint error - pull out before updating
  const {isFormSubmit, newPassword, password, ...updateQuery} = query;

  let updatedAccount: tAccount[];
  try {
    updatedAccount = await knex(table)
      .limit(1)
      .where({id: loggedInAccount.id})
      .update(updateQuery)
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  if (isFormSubmit) return;

  if (!updatedAccount
      || (updatedAccount instanceof Array && updatedAccount.length === 0)) {
    ctx.status = 204;
    ctx.body = {};
  }

  const body: tAccount = updatedAccount[0];
  ctx.body = body;
});
