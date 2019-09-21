import Koa from 'koa';

import {knex} from '../db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getRolesByAccountId = async (
  ctx: Koa.ParameterizedContext,
  accountId: number = 0): Promise<tRoleMap[]> => {

  let roles: tRoleMap[] = [];
  try {
    roles = await knex('accounts_roles').where({accountId});
  } catch (err) {
    return ctx.throw(400, err);
  }

  return roles;
};
