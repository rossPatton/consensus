import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../../../db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getRolesByOrgId = async (
  ctx: Koa.ParameterizedContext,
  query: tUsersByOrgIdQuery,
): Promise<tAccountRoleRelation[]> => {
  const {orgId, noPending} = query;
  try {
    const roles = knex('accounts_roles');

    if (noPending === 'true') {
      roles.andWhereNot({role: 'pending'});
    }

    roles.where({orgId});

    return roles;
  } catch (err) {
    return ctx.throw(400, err);
  }
};
