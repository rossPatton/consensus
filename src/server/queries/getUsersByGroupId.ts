import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../db/connection';

// TODO this query should be simplfied if at all possible
export const getUsersByGroupId = async (
  ctx: Koa.ParameterizedContext,
  groupId: number,
): Promise<ts.user[]> => {
  const rolesStream = knex('accounts_roles').where({groupId}).stream();
  const roleMaps: ts.roleRel[] = [];
  try {
    for await (const chunk of rolesStream) {
      roleMaps.push(chunk);
    }
  } catch (err) {
    return ctx.throw(500, err);
  }

  let userIds: number[];
  try {
    userIds = await Promise.all(roleMaps.map(async idSet => idSet.userId));
  } catch (err) {
    return ctx.throw(500, err);
  }

  // use the returned ids to query users table
  const usersStream = knex('users').whereIn('id', userIds).stream();
  const users: ts.user[] = [];
  try {
    for await (const chunk of usersStream) {
      users.push(chunk);
    }
  } catch (err) {
    return ctx.throw(500, err);
  }

  return await Promise.all(roleMaps.map(async roleMap => {
    const userProfile = _.find(users, user => roleMap.userId === user.id) as ts.user;

    return {
      ...userProfile,
      role: roleMap.role,
    };
  }));
};
