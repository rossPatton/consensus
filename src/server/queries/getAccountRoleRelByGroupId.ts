import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getAccountRoleRelByGroupId = async (
  ctx: Koa.ParameterizedContext,
  groupId: string | number = 0): Promise<ts.roleRel> => {
  const account = _.get(ctx, 'state.user', {});

  let accountRoleRel: ts.roleRel;
  if (account.id) {
    try {
      accountRoleRel = await knex('accounts_roles')
        .limit(1)
        .where({accountId: account.id, groupId})
        .first();
    } catch (err) {
      return ctx.throw(400, err);
    }
  }

  return accountRoleRel || {} as ts.roleRel;
};
