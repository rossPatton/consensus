import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const roles = new Router();
const route = '/api/v1/roles';
const table = 'accounts_roles';

// get all roles for current logged in session
roles.get(route, async (ctx: Koa.ParameterizedContext) => {
  const accountId = _.get(ctx, 'state.locals.data.id', 0);

  let rows: any[];
  try {
    rows = await knex(table).where({accountId});
  } catch (err) {
    return ctx.throw(400, err);
  }

  // sometimes there could be no error but nothing was found
  if (!rows) return ctx.throw(204, 'Nothing found');

  const mappedRoles = rows.map(row => ({
    orgId: row.orgId,
    role: row.role,
  }));

  ctx.body = mappedRoles;
});
