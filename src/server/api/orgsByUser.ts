import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const orgsByUser = new Router();
const route = '/api/v1/orgsByUser';
const table = 'users_orgs';

orgsByUser.get(route, async (ctx: Koa.ParameterizedContext) => {
  const userId = _.get(ctx, 'state.user.id', 0);

  let userOrgRels: tUserOrgRelation[];
  try {
    userOrgRels = await knex(table).where({userId});
  } catch (err) {
    return ctx.throw(400, err);
  }

  const mappedIds = userOrgRels.map(idSet => idSet.orgId);

  let orgs: tOrg[];
  try {
    orgs = await knex('orgs').whereIn('id', mappedIds);
  } catch (err) {
    return ctx.throw(400, err);
  }

  const orgsWithUserRole = await Promise.all(orgs.map(async org => {
    const userOrgRel = _.find(userOrgRels, rel => rel.orgId === org.id);

    return {
      ...org,
      role: userOrgRel ? userOrgRel.role : null,
    };
  }));

  ctx.body = orgsWithUserRole;
});
