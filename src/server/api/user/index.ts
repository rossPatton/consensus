import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';
import {validateSchema} from '~app/server/utils';

import {userKeys} from '../_constants';
import {getSchema, patchSchema, postSchema} from './_schema';
import {tUserPostServerQuery} from './_types';

export const user = new Router();
const route = '/api/v1/user';
const table = 'users';

const errorMessage = 'Failed to insert user into database. Your email and username must be unique, and the token must match the one sent to you.';

user.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const loggedInAccount = ctx?.state?.user;
  if (!loggedInAccount) return ctx.throw(401, 'Must be logged in');

  try {
    await pg.transaction(async trx => {
      await pg(table)
        .transacting(trx)
        .limit(1)
        .where({id: loggedInAccount.id})
        .first()
        .del()
        .then(trx.commit)
        .catch(trx.rollback);
    });
  } catch (err) {
    return ctx.throw(500, err);
  }

  await ctx.logout();
  ctx.body = {ok: true};
});

user.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.userQuery} = ctx;
  await validateSchema<ts.userQuery>(ctx, getSchema, query);

  await pg.transaction(async trx => {
    ctx.body = pg('users')
      .transacting(trx)
      .limit(1)
      .where(query)
      .first();
  });
});

user.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.userQuery} = ctx;
  await validateSchema<ts.userQuery>(ctx, patchSchema, query);

  const loggedInAccount = ctx?.state?.user;
  if (!loggedInAccount) return ctx.throw(401, 'Must be logged in');

  const {sessionType, token, ...userQuery} = query;

  // if (token) {
  //   const validates = totpTokenValidates({
  //     token,
  //     secret: query.otpSecret,
  //   });

  //   if (!validates) return ctx.throw(401, 'Token incorrect');
  // }

  try {
    await pg.transaction(async trx => {
      const updatedUser = await pg(table)
        .transacting(trx)
        .limit(1)
        .where({id: query.id})
        .update(userQuery)
        .returning(userKeys)
        .then(trx.commit)
        .catch(trx.rollback);

      ctx.body = updatedUser?.[0];
    });
  } catch (err) {
    return ctx.throw(500, err);
  }
});

// user signup form basically
user.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: tUserPostServerQuery} = ctx;
  await validateSchema<tUserPostServerQuery>(ctx, postSchema, query);

  try {
    await pg.transaction(async trx => {
      const userResult = await pg('users')
        .transacting(trx)
        .insert({avatar: '1', ...query})
        .returning(userKeys)
        .then(trx.commit)
        .catch(trx.rollback);

      ctx.body = userResult?.[0];
    });
  } catch (err) {
    return ctx.throw(500, errorMessage);
  }
});
