import Koa from 'koa';
import _ from 'lodash';

import {userKeys} from '../../_constants';
import {knex} from '../../../db/connection';
import {getRolesByGroupId} from './getRolesByGroupId';

export const getUsersByGroupId = async (
  ctx: Koa.ParameterizedContext,
  query: tUsersByGroupIdQuery,
): Promise<tUser[]> => {
  const roleMaps = await getRolesByGroupId(ctx, query);

  let userIds: number[] = [];
  try {
    userIds = await Promise.all(roleMaps.map(async idSet => idSet.userId));
  } catch (err) {
    return ctx.throw(500, err);
  }

  // use the returned ids to query users table
  const usersStream = knex('users')
    .whereIn('id', userIds)
    .select(userKeys)
    .stream();
  const users: tUser[] = [];
  try {
    for await (const chunk of usersStream) {
      users.push(chunk);
    }
  } catch (err) {
    return ctx.throw(500, err);
  }

  // TODO refactor where we add role all over the place
  return await Promise.all(roleMaps.map(async roleMap => {
    const userProfile = _.find(users, user => roleMap.userId === user.id) as tUser;

    return {
      ...userProfile,
      role: roleMap.role,
    };
  }));
};
