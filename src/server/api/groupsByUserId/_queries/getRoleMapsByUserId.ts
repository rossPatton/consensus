import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../../../db/connection';

export const getRoleMapsByUserId = async (
  ctx: Koa.ParameterizedContext,
  query: ts.groupsByUserIdQuery,
): Promise<ts.meeting[]> => {
  const {noPending, userId} = query;

  try {
    const userGroupRels = knex('users_roles');
    if (noPending) userGroupRels.whereNot({role: 'pending'});
    return userGroupRels.where({userId}).orderBy('updated_at', 'asc');
  } catch (err) {
    return ctx.throw(500, err);
  }
};
