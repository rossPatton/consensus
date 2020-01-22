import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {getRolesByAccountId} from '../queries';

export const roles = new Router();
const route = '/api/v1/roles';

// get all roles for current logged in session
roles.get(route, async (ctx: Koa.ParameterizedContext) => {
  const accountId = _.get(ctx, 'state.user.id', 0);
  const roles = await getRolesByAccountId(ctx, accountId);

  // sometimes there could be no error but nothing was found
  if (!roles) ctx.status = 204;

  // only need orgId and role on the client
  const mappedRoles = roles.map(role => ({
    orgId: role.orgId,
    role: role.role,
  }));

  ctx.body = mappedRoles;
});
