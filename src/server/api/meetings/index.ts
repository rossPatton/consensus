import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';
import {validateSchema} from '~app/server/utils';

import {getMeetingsByQuery} from './_queries';
import {deleteSchema, getSchema} from './_schema';
import {tMeetingsServerQuery} from './_types';

export const meetings = new Router();
const route = '/api/v1/meetings';
const table = 'meetings';

// get multiple meetings at a time
meetings.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: tMeetingsServerQuery} = ctx;
  await validateSchema<tMeetingsServerQuery>(ctx, getSchema, query);

  try {
    const account = ctx?.state?.user;
    await pg.transaction(async trx => {
      let role = 'n/a' as ts.role;
      if (account?.id) {
        const accountRoleRel: ts.roleMap = await pg('users_roles')
          .transacting(trx)
          .limit(1)
          .where({
            userId: account.id,
            groupId: query.groupId,
          })
          .first();

        role = accountRoleRel?.role;
      }

      ctx.body = await getMeetingsByQuery(trx, ctx, {...query, role});
    });
  } catch (err) {
    ctx.throw(500, err);
  }
});

meetings.delete(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.idQuery} = ctx;
  await validateSchema<ts.idQuery>(ctx, deleteSchema, query);

  try {
    await pg.transaction(async trx => pg(table)
      .transacting(trx)
      .limit(1)
      .where({id: query.id})
      .del()
      .then(trx.commit)
      .catch(trx.rollback),
    );

    // we use the id on the client to filter out the now deleted meeting
    ctx.body = {id: parseInt(query.id as string, 10)};
  } catch (err) {
    return ctx.throw(500, err);
  }


});
