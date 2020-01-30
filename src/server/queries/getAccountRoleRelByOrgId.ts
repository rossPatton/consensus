import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getAccountRoleRelByOrgId = async (
  ctx: Koa.ParameterizedContext,
  orgId: string | number = 0): Promise<tAccountRoleRelation> => {
  const account = _.get(ctx, 'state.user', {});

  let accountRoleRel: tAccountRoleRelation;
  if (account.id) {
    try {
      accountRoleRel = await knex('accounts_roles')
        .limit(1)
        .where({accountId: account.id, orgId})
        .first();
    } catch (err) {
      return ctx.throw(400, err);
    }
  }

  return accountRoleRel || {} as tAccountRoleRelation;
};
