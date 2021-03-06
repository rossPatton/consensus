import Koa from 'koa';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getRolesByGroupId = async (
  ctx: Koa.ParameterizedContext,
  query: ts.usersByGroupIdQuery,
): Promise<ts.roleRel[]> => {
  const {groupId, noPending} = query;
  try {
    const roles = pg('users_roles');

    if (noPending === 'true') {
      roles.andWhereNot({role: 'pending'});
    }

    roles.where({groupId});

    return roles;
  } catch (err) {
    return ctx.throw(500, err);
  }
};
