import Koa from 'koa';
import _ from 'lodash';

import { knex } from '../db/connection';

// TODO add sanitization/validation
export const getUsersByOrgId = async (
  ctx: Koa.ParameterizedContext,
  orgId: any): Promise<tUsersByOrg> => {

  const userOrgRelsStream = knex('users_orgs').where({orgId}).stream();
  const userOrgRels: tUserOrgRelation[] = [];
  try {
    for await (const chunk of userOrgRelsStream) {
      userOrgRels.push(chunk);
    }
  } catch (err) {
    return ctx.throw(400, err);
  }

  let mappedIds: number[];
  try {
    mappedIds = await Promise.all(userOrgRels.map(async idSet => idSet.userId));
  } catch (err) {
    return ctx.throw(400, err);
  }

  // use the returned ids to query users table
  const usersStream = knex('users').whereIn('id', mappedIds).stream();
  const users: tUser[] = [];
  try {
    for await (const chunk of usersStream) {
      users.push(chunk);
    }
  } catch (err) {
    return ctx.throw(400, err);
  }

  let accountRoles: tUserOrgRelation[];
  try {
    accountRoles = await knex('accounts_roles').where({orgId});
  } catch (err) {
    return ctx.throw(400, err);
  }

  // TODO refactor where we add role all over the place
  const usersWithRole = await Promise.all(users.map(async user => {
    const roleRel = _.find(accountRoles, rel => rel.userId === user.id);

    return {
      ...user,
      role: roleRel ? roleRel.role : null,
    };
  }));

  return {
    userTotal: mappedIds.length,
    users: usersWithRole,
  };
};
