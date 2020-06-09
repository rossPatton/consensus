import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {pg} from '~app/server/db/connection';
import {validateSchema} from '~app/server/utils';

import {queue} from '..';
import {groupKeys} from '../_constants';
import {groupSchema} from '../_schemas';

export const groups = new Router();
const route = '/api/v1/groups';

groups.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.getGroupQuery} = ctx;
  await validateSchema<ts.getGroupQuery>(ctx, groupSchema, query);

  try {
    const groups: ts.group[] = await queue.add(() => pg('groups')
      .where(query)
      .andWhereNot({type: 'hidden'})
      .select(groupKeys),
    );

    ctx.body = groups;
  } catch (err) {
    return ctx.throw(500, err);
  }
});
