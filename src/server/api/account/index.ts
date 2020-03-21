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
  const query: Mutable<tAccountQuery> = _.get(ctx, 'state.locals.data', {});
  const account: tAccount = _.get(ctx, 'state.user', {});
  await validateSchema<Mutable<tAccountQuery>>(ctx, deleteSchema, {
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

// TODO implement a POST route here as an upsert for non-js environments
account.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const query: Mutable<tAccountQuery> = _.get(ctx, 'state.locals.data', {});
  await validateSchema<Mutable<tAccountQuery>>(ctx, patchSchema, query);

  const loggedInAccount: tAccount = _.get(ctx, 'state.user', {});
  const isValidPW = await isValidPw(query.currentPassword, loggedInAccount.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  const updateQuery: {[key: string]: unknown} = {
    deletionDeadline: query.deletionDeadline,
    login: query.login,
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

  let updatedAccount: tAccount[] = [];
  if (!_.isEmpty(updateQuery)) {
    try {
      updatedAccount = await knex(table)
        .limit(1)
        .where({id: loggedInAccount.id})
        .update(updateQuery)
      // readonly string[] vs string[] trips typescript up
        .returning(accountKeys as string[]);
    } catch (err) {
      return ctx.throw(500, err);
    }
  }

  let updatedEmail = [] as tEmail[];
  if (query.email) {
    try {
      updatedEmail = await knex('accounts_emails')
        .limit(1)
        .where({id: loggedInAccount.id})
        .update({email: query.email})
        .returning('email');
    } catch (err) {
      return ctx.throw(400, err);
    }
  }

  if (query.isFormSubmit) return;

  let body: tAccount = updatedAccount[0];
  if (updatedEmail) {
    body = {
      ...body,
      emails: updatedEmail,
    };
  }

  ctx.body = body;
});
