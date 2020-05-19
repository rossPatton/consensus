import Koa from 'koa';
import Router from 'koa-router';

import { validateSchema } from '../../utils';
import { schema } from './_schema';
import { getRolesByAccountId } from './queries';

export const roles = new Router();
const route = '/api/v1/roles';

// get all roles for current logged in session
roles.get(route, async (ctx: Koa.ParameterizedContext) => {
  const accountId: number = ctx?.state?.user?.id;
  await validateSchema(ctx, schema, {accountId});

  const roles = await getRolesByAccountId(ctx, accountId);

  // sometimes there could be no error but nothing was found
  if (!roles || roles.length === 0) {
    ctx.status = 204;
  }

  ctx.body = roles;
});
