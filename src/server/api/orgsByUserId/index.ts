import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {orgKeys} from '../_constants';
import {knex} from '../../db/connection';
import {validateSchema} from '../../utils';
import {getRoleMapsByUserId} from './_queries';
import {deleteSchema, getSchema} from './_schema';

const route = '/api/v1/orgsByUserId';
const table = 'accounts_roles';
const dataPath = 'state.locals.data';
export const orgsByUserId = new Router();

orgsByUserId.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tOrgsByUserIdQuery = _.get(ctx, dataPath, {});
  await validateSchema<tOrgsByUserIdQuery>(ctx, getSchema, query);

  const userGroupRels = await getRoleMapsByUserId(ctx, query);
  const mappedIds = userGroupRels.map(idSet => idSet.orgId);

  let orgs = [] as tOrg[];
  try {
    orgs = await knex('orgs')
      .whereIn('id', mappedIds)
      .select(orgKeys);
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = orgs;
});

// we use accountId here because only a user can choose to leave an org
// orgs can remove users, via the usersByOrg api, but in both cases
// we check against the session instead of allowing the client to pass in any id
orgsByUserId.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const {orgId}: tDeleteUserByOrgIdQuery = _.get(ctx, dataPath, {});
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
