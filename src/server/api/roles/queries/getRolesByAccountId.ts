import Koa from 'koa';

import { knex } from '../../../db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getRolesByAccountId = async (
  ctx: Koa.ParameterizedContext,
  accountId: number = 0,
): Promise<ts.roleMap[]> => {
  let roles: ts.roleMap[] = [];
  try {
    roles = await knex('accounts_roles')
      .where({accountId})
      .select('groupId', 'role');
  } catch (err) {
    return ctx.throw(500, err);
  }

  return roles;
};
