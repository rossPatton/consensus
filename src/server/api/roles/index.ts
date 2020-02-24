import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { validateSchema } from '../../utils';
import { schema } from './_schema';
import { getRolesByAccountId } from './queries';

export const roles = new Router();
const route = '/api/v1/roles';

// get all roles for current logged in session
roles.get(route, async (ctx: Koa.ParameterizedContext) => {
  const accountId: number = _.get(ctx, 'state.user.id', 0);
  await validateSchema(ctx, schema, {accountId});

  const roles = await getRolesByAccountId(ctx, accountId);

  // sometimes there could be no error but nothing was found
  if (!roles || roles.length === 0) {
    ctx.status = 204;
  }

  ctx.body = roles;
});
