import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';

export const users = new Router();
const route = '/api/v1/users';
const table = 'users';

users.get(route, async (ctx: Koa.ParameterizedContext) => {
  // rn this route is only used as a test route, so just return everything
  const stream = knex(table).stream();
  const allUsers: tUser[] = [];
  try {
    for await (const chunk of stream) {
      allUsers.push(chunk);
    }
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = allUsers;
});
