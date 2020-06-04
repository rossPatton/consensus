import Koa from 'koa';
import Router from 'koa-router';

import { pg } from '~app/server/db/connection';

import { validateSchema } from '../../utils';
import { schema } from './_schema';

export const roles = new Router();
const route = '/api/v1/roles';

// get all roles for current logged in session
roles.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {id} = ctx?.state?.user;
  await validateSchema(ctx, schema, {id});

  let roles = [] as ts.roleMap[];
  try {
    roles = await pg('users_roles')
      .where({userId: id})
      .select('groupId', 'role');
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = roles;
});
