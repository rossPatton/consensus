import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../../../db/connection';

export const getRoleMapsByUserId = async (
  ctx: Koa.ParameterizedContext,
  query: tOrgsByUserIdQuery,
): Promise<tEvent[]> => {
  const {noPending, userId} = query;

  try {
    const userGroupRels = knex('accounts_roles');
    if (noPending) userGroupRels.whereNot({role: 'pending'});
    return userGroupRels.where({userId}).orderBy('updated_at', 'asc');
  } catch (err) {
    return ctx.throw(400, err);
  }
};
