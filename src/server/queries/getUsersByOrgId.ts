import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../db/connection';

// TODO add sanitization/validation
// TODO this query should be simplfied if at all possible
export const getUsersByOrgId = async (
  ctx: Koa.ParameterizedContext,
  orgId: number,
): Promise<tUsersByOrg> => {
  const rolesStream = knex('accounts_roles').where({orgId}).stream();
  const roleMaps: tAccountRoleRelation[] = [];
  try {
    for await (const chunk of rolesStream) {
      roleMaps.push(chunk);
    }
  } catch (err) {
    return ctx.throw(400, err);
  }

  let userIds: number[];
  try {
    userIds = await Promise.all(roleMaps.map(async idSet => idSet.userId));
  } catch (err) {
    return ctx.throw(400, err);
  }

  // use the returned ids to query users table
  const usersStream = knex('users').whereIn('id', userIds).stream();
  const users: tUser[] = [];
  try {
    for await (const chunk of usersStream) {
      users.push(chunk);
    }
  } catch (err) {
    return ctx.throw(400, err);
  }

  // TODO refactor where we add role all over the place
  const usersWithRole = await Promise.all(roleMaps.map(async roleMap => {
    const userProfile = _.find(users, user => roleMap.userId === user.id) as tUser;

    return {
      ...userProfile,
      role: roleMap.role,
    };
  }));

  return {
    userTotal: userIds.length,
    users: usersWithRole,
  };
};