import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {validateSchema} from '../../utils';
import {orgKeys} from './_constants';
import {deleteSchema, getSchema} from './_schema';

export const orgsByUser = new Router();
const route = '/api/v1/orgsByUser';
const table = 'accounts_roles';
const dataPath = 'state.locals.data';

orgsByUser.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  await validateSchema(ctx, getSchema, query);

  // TODO the below can be simplified
  let userOrgRels: tAccountRoleRelation[] = [];
  try {
    userOrgRels = await knex(table).where(query);
  } catch (err) {
    return ctx.throw(400, err);
  }

  const mappedIds = userOrgRels.map(idSet => idSet.orgId);

  let orgs: tOrg[] = [];
  try {
    orgs = await knex('orgs').whereIn('id', mappedIds).select(orgKeys);
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

// we use accountId here because only a user can choose to leave an org
// orgs can remove users, via the usersByOrg api, but in both cases
// we check against the session instead of allowing the client to pass in any id
orgsByUser.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const {orgId} = _.get(ctx, dataPath, {});
  const userId = _.get(ctx, 'state.user.id', 0);
  const query = {orgId, userId};

  await validateSchema<tDeleteUserByOrgIdQuery>(ctx, deleteSchema, query);

  try {
    await knex(table)
      .limit(1)
      .where(query)
      .first()
      .del();
  } catch (err) {
    return ctx.throw(400, err);
  }

  // orgId is needed on client to update redux state
  ctx.body = {ok: true, orgId: parseInt(orgId, 10)};
});
