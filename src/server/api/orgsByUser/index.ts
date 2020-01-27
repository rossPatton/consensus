import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {orgKeys} from './_constants';
import {deleteSchema, getSchema} from './_schema';

export const orgsByUser = new Router();
const route = '/api/v1/orgsByUser';
const table = 'accounts_roles';
const dataPath = 'state.locals.data';
const errorPath = 'details[0].message';
const errorMsg = 'Bad Request';

orgsByUser.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});

  try {
    await getSchema.validateAsync(query);
  } catch (err) {
    const message = _.get(err, 'details[0].message', 'Bad Request');
    return ctx.throw(400, message);
  }

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

  try {
    await deleteSchema.validateAsync<tDeleteUserByOrgIdQuery>(query);
  } catch (err) {
    const message = _.get(err, errorPath, errorMsg);
    return ctx.throw(400, message);
  }

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
