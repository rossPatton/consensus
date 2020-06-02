import Koa from 'koa';
import Router from 'koa-router';

import {groupKeys} from '../_constants';
import {knex} from '../../db/connection';
import {validateSchema} from '../../utils';
import {getRoleMapsByUserId} from './_queries';
import {deleteSchema, getSchema} from './_schema';

const route = '/api/v1/groupsByUserId';
const table = 'users_roles';

export const groupsByUserId = new Router();

groupsByUserId.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.groupsByUserIdQuery} = ctx;
  await validateSchema<ts.groupsByUserIdQuery>(ctx, getSchema, query);

  const userGroupRels = await getRoleMapsByUserId(ctx, query);
  const mappedIds = userGroupRels.map(idSet => idSet.groupId);

  let group = [] as ts.group[];
  try {
    group = await knex('groups')
      .whereIn('id', mappedIds)
      .select(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = group;
});

// we use accountId here because only a user can choose to leave an org
// group can remove users, via the usersByOrg api, but in both cases
// we check against the session instead of allowing the client to pass in any id
groupsByUserId.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const {groupId}: ts.deleteUserByGroupIdQuery = ctx.query;
  const userId = ctx?.state?.user?.id;
  const query = {groupId, userId};

  await validateSchema<ts.deleteUserByGroupIdQuery>(ctx, deleteSchema, query);

  try {
    await knex(table)
      .limit(1)
      .where(query)
      .first()
      .del();
  } catch (err) {
    return ctx.throw(500, err);
  }

  // groupId is needed on client to update redux state
  ctx.body = {ok: true, groupId: parseInt(groupId, 10)};
});
