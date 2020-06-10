import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';
import {validateSchema} from '~app/server/utils';

import {groupKeys} from '../_constants';
import {deleteSchema, getSchema} from './_schema';

const route = '/api/v1/groupsByUserId';
const table = 'users_roles';
export const groupsByUserId = new Router();

groupsByUserId.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.groupsByUserIdQuery} = ctx;
  await validateSchema<ts.groupsByUserIdQuery>(ctx, getSchema, query);
  const {noPending, userId} = query;

  try {
    await pg.transaction(async trx => {
      const userGroupRelsTrx = pg('users_roles').transacting(trx);
      if (noPending) userGroupRelsTrx.whereNot({role: 'pending'});
      userGroupRelsTrx.where({userId}).orderBy('updated_at', 'asc');

      const userGroupRels = await userGroupRelsTrx;
      const mappedIds = await Promise.all(
        _.uniq(userGroupRels.map(idSet => idSet.groupId)),
      );
      const groups = await pg('groups')
        .transacting(trx)
        .whereIn('id', mappedIds)
        .select(groupKeys);

      ctx.body = groups;
    });
  } catch (err) {
    return ctx.throw(500, err);
  }
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
    await pg.transaction(async trx => pg(table)
      .transacting(trx)
      .limit(1)
      .where(query)
      .first()
      .del()
      .then(trx.commit)
      .catch(trx.rollback),
    );

    // groupId is needed on client to update redux state
    ctx.body = {
      ok: true,
      groupId: parseInt(groupId, 10),
    };
  } catch (err) {
    return ctx.throw(500, err);
  }
});
