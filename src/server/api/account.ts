import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';
import {encrypt, isValidPw, saltedHash} from '../utils';

export const account = new Router();
const route = '/api/v1/account';
const table = 'accounts';

// TODO no-js forms only do GET/POST - figure out how to make patches work w/o js
account.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const data = _.get(ctx, 'state.locals.data', {});
  const loggedInAccount: tAccount = _.get(ctx, 'state.user', {});

  const isValidPW = await isValidPw(data.password, loggedInAccount.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  if (data.newPassword) {
    const safePW = await saltedHash(data.newPassword);
    data.password = encrypt(safePW);
  }

  // password stuff will cause a constraint error - pull out before updating
  const {isFormSubmit, newPassword, password, ...updateQuery} = data;
  console.log('data => ', data);

  let updatedAccount: tUser[];
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

  console.log('updatedAccount => ', updatedAccount);

  const body = updatedAccount[0];
  ctx.body = body;
});
