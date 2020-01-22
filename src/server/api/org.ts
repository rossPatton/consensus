import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';

export const org = new Router();
const route = '/api/v1/org';
const table = 'orgs';
const dataPath = 'state.locals.data';

org.get(route, async (ctx: Koa.ParameterizedContext) => {
  const userId = _.get(ctx, 'state.user.id', 0);
  const orgId = _.get(ctx, 'state.locals.data.id', 0);

  let org: tOrg;
  try {
    org = await knex(table)
      .limit(1)
      .where({id: orgId})
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  let userOrgRel: tAccountRoleRelation;
  try {
    userOrgRel = await knex('accounts_roles')
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

org.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...newOrg} = _.get(ctx, dataPath, {});

  let updatedOrg: tOrg[];
  try {
    updatedOrg = await knex(table)
      .limit(1)
      .where({id: newOrg.id})
      .update(newOrg)
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  const {createdAt, email, updatedAt, ...safeOrg} = updatedOrg[0];
  ctx.body = safeOrg;
});

org.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...org} = _.get(ctx, dataPath, {});

  let newOrg: tOrg[];
  try {
    newOrg = await knex(table).insert(org).returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  const {createdAt, email, updatedAt, ...safeOrg} = newOrg[0];
  ctx.body = safeOrg;
});
