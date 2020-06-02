import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';
import {Mutable} from 'utility-types';

import {accountKeys} from '../_constants';
import {knex} from '../../db/connection';
import {validateSchema} from '../../utils';
import {deleteSchema, patchSchema, postSchema} from './_schema';

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

account.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: Mutable<ts.accountQuery>} = ctx;
  await validateSchema<Mutable<ts.accountQuery>>(ctx, patchSchema, query);

  const loggedInAccount: ts.account = ctx?.state?.user || {};
  if (!loggedInAccount) return ctx.throw(401);

  let updatedAccount = [] as ts.account[];
  try {
    updatedAccount = await knex(table)
      .limit(1)
      .where({id: loggedInAccount.id})
      .update(query)
      .returning(accountKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = updatedAccount?.[0];
});

account.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: Mutable<ts.accountQuery>} = ctx;
  await validateSchema<Mutable<ts.accountQuery>>(ctx, postSchema, query);

  let newAccount = [] as ts.account[];
  try {
    newAccount = await knex(table)
      .limit(1)
      .insert(query)
      .returning(accountKeys);
  } catch (err) {
    if (err.constraint === 'accounts_email_unique') {
      return ctx.throw(500, 'Emails must be unique.');
    }

    return ctx.throw(500, err);
  }

  ctx.body = newAccount?.[0];
});
