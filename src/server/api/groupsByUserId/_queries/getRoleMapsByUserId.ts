import Koa from 'koa';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';

export const getRoleMapsByUserId = async (
  ctx: Koa.ParameterizedContext,
  query: ts.groupsByUserIdQuery,
): Promise<ts.meeting[]> => {
  const {noPending, userId} = query;

  try {
    const userGroupRels = pg('users_roles');
    if (noPending) userGroupRels.whereNot({role: 'pending'});
    return userGroupRels.where({userId}).orderBy('updated_at', 'asc');
  } catch (err) {
    return ctx.throw(500, err);
  }
};
