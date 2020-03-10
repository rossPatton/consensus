import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';
import {Mutable} from 'utility-types';

import {accountKeys} from '../_constants';
import {knex} from '../../db/connection';
import {encrypt, isValidPw, saltedHash, validateSchema} from '../../utils';
import {deleteSchema, schema} from './_schema';

export const account = new Router();
const route = '/api/v1/account';
const table = 'accounts';


account.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const query: Mutable<tAccountQuery> = _.get(ctx, 'state.locals.data', {});
  const account: tAccount = _.get(ctx, 'state.user', {});
  await validateSchema<Mutable<tAccountQuery>>(ctx, deleteSchema, {
    ...query,
    id: account.id,
    userId: account.userId,
  });

  const isValidPW = await isValidPw(query.password, account.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  // delete account and user references. leave rsvps, etc
  if (account.userId) {
    try {
      await knex('users')
        .limit(1)
        .where({id: account.userId})
        .delete();
    } catch (err) {
      return ctx.throw(400, err);
    }
    try {
      await knex(table)
        .limit(1)
        .where({id: account.id})
        .delete();
    } catch (err) {
      return ctx.throw(400, err);
    }
  }

  ctx.body = {ok: true};
});

// TODO implement a POST route here as an upsert
account.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const query: Mutable<tAccountQuery> = _.get(ctx, 'state.locals.data', {});
  await validateSchema<Mutable<tAccountQuery>>(ctx, schema, query);

  const loggedInAccount: tAccount = _.get(ctx, 'state.user', {});
  const isValidPW = await isValidPw(query.password, loggedInAccount.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  if (query.newPassword) {
    const safePW = await saltedHash(query.newPassword);
    query.password = encrypt(safePW);
  }

  // password stuff will cause a constraint error - pull out before updating
  const {isFormSubmit, newPassword, password, ...updateQuery} = query;
  if (updateQuery.deletionDeadline === 'null') {
    updateQuery.deletionDeadline = null;
  }

  let updatedAccount: tAccount[];
  try {
    updatedAccount = await knex(table)
      .limit(1)
      .where({id: loggedInAccount.id})
      .update(updateQuery)
      // readonly string[] vs string[] trips typescript up
      .returning(accountKeys as string[]);
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
