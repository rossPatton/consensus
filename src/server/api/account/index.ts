import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';
import {Mutable} from 'utility-types';

import {accountKeys} from '../_constants';
import {knex} from '../../db/connection';
import {encrypt, isValidPw, saltedHash, validateSchema} from '../../utils';
import {deleteSchema, patchSchema} from './_schema';

export const account = new Router();
const route = '/api/v1/account';
const table = 'accounts';

account.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: Mutable<ts.accountQuery>} = ctx;
  const account: ts.account = ctx?.state?.user || {};
  await validateSchema<Mutable<ts.accountQuery>>(ctx, deleteSchema, {
    ...query,
    id: account.id,
    userId: account.userId,
  });

  const isValidPW = await isValidPw(query.currentPassword, account.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  // delete account and user references. leave rsvps, etc
  // group deletions go through a different process
  if (account.userId) {
    try {
      await knex('users')
        .limit(1)
        .where({id: account.userId})
        .delete();
    } catch (err) {
      return ctx.throw(500, err);
    }
    try {
      await knex(table)
        .limit(1)
        .where({id: account.id})
        .delete();
    } catch (err) {
      return ctx.throw(500, err);
    }
  }

  ctx.body = {ok: true};
});

// TODO implement a POST route here as an upsert for non-js environments
account.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: Mutable<ts.accountQuery>} = ctx;
  await validateSchema<Mutable<ts.accountQuery>>(ctx, patchSchema, query);

  const loggedInAccount: ts.account = ctx?.state?.user || {};
  const isValidPW = await isValidPw(query.currentPassword, loggedInAccount.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  const updateQuery: {[key: string]: unknown} = {
    deletionDeadline: query.deletionDeadline,
    email: query.email,
    login: query.login,
    privateEmail: query.privateEmail,
  };

  // handle nulls for deletionDeadline
  if (updateQuery.deletionDeadline === 'null') {
    updateQuery.deletionDeadline = null;
  }

  // if changing password, salt/hash and encrypt first before updating
  if (query.newPassword) {
    const safePW = await saltedHash(query.newPassword);
    updateQuery.password = encrypt(safePW);
  }

  // if user or group changes their email, reset verification
  if (updateQuery.email !== loggedInAccount.email) {
    updateQuery.isVerified = false;
  }

  let updatedAccount: ts.account[] = [];
  if (!_.isEmpty(updateQuery)) {
    try {
      updatedAccount = await knex(table)
        .limit(1)
        .where({id: loggedInAccount.id})
        .update(updateQuery)
        .returning(accountKeys);
    } catch (err) {
      return ctx.throw(500, err);
    }
  }

  ctx.body = updatedAccount?.[0];
});
