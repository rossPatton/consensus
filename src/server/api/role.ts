import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const role = new Router();
const route = '/api/v1/role';
const table = 'users_orgs';

// get role for current logged in user by orgId
role.get(route, async (ctx: Koa.ParameterizedContext) => {
  const orgId = parseInt(_.get(ctx, 'state.locals.data.id', '0'), 10);
  const userId = _.get(ctx, 'state.user.id', 0);
  let body: tRole;
  try {
    body = await knex(table).limit(1).where({orgId, userId}).first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  // sometimes there could be no error but nothing was found
  if (!body) return ctx.throw(204, 'Nothing found');
  ctx.body = body;
});
