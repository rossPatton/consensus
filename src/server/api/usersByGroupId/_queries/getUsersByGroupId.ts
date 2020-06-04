import Koa from 'koa';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';

import {userKeys} from '../../_constants';
import {getRolesByGroupId} from './getRolesByGroupId';

export const getUsersByGroupId = async (
  ctx: Koa.ParameterizedContext,
  query: ts.usersByGroupIdQuery,
): Promise<ts.user[]> => {
  const roleMaps = await getRolesByGroupId(ctx, query);

  let userIds: number[] = [];
  try {
    userIds = await Promise.all(roleMaps.map(async idSet => idSet.userId));
  } catch (err) {
    return ctx.throw(500, err);
  }

  // use the returned ids to query users table
  const usersStream = pg('users')
    .whereIn('id', userIds)
    .select(userKeys)
    .stream();
  const users: ts.user[] = [];
  try {
    for await (const chunk of usersStream) {
      users.push(chunk);
    }
  } catch (err) {
    return ctx.throw(500, err);
  }

  // TODO refactor where we add role all over the place
  return await Promise.all(roleMaps.map(async roleMap => {
    const userProfile = _.find(users, user => roleMap.userId === user.id) as ts.user;

    return {
      ...userProfile,
      role: roleMap.role,
    };
  }));
};
