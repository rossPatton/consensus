import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const orgById = new Router();
const route = '/api/v1/orgById';
const table = 'orgs';

orgById.get(route, async (ctx: Koa.ParameterizedContext) => {
  const userId = _.get(ctx, 'state.user.id', 0);
  const orgId = _.get(ctx, 'state.locals.data.id', 0);
  const id = parseInt(orgId, 10);

  let org: tOrg;
  try {
    org = await knex(table)
      .limit(1)
      .where({id})
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  let userOrgRel: tUserOrgRelation;
  try {
    userOrgRel = await knex('users_orgs')
      .limit(1)
      .where({userId, orgId: org.id})
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  const orgWithRole = {
    ...org,
    role: userOrgRel ? userOrgRel.role : null,
  };

  ctx.body = orgWithRole;
});
