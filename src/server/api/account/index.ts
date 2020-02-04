import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {encrypt, isValidPw, saltedHash} from '../../utils';
import {schema} from './_schema';

export const account = new Router();
const route = '/api/v1/account';
const table = 'accounts';

// TODO no-js forms only do GET/POST - figure out how to make patches work w/o js
// this is basically just for updating your user/org info
account.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tAccountQuery & {isFormSubmit: boolean} =
    _.get(ctx, 'state.locals.data', {});

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

  if (!updatedAccount
      || (updatedAccount instanceof Array && updatedAccount.length === 0)) {
    ctx.status = 204;
  }

  const body = updatedAccount[0];
  ctx.body = body;
});
