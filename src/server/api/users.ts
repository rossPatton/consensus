import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const users = new Router();
const route = '/api/v1/users';
const table = 'users';

users.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, 'state.locals.data', {});
  const {limit, isFormSubmit, offset, ...where} = query;

  try {
    const users: tUser[] = await knex(table)
      .limit(limit)
      .where(where)
      .offset(offset);

    ctx.body = users;
  } catch (err) {
    ctx.throw(400, err);
  }
});
