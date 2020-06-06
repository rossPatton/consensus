import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {groupKeys} from '../_constants';
import {groupSchema} from '../_schemas';
import {pg} from '../../db/connection';
import {validateSchema} from '../../utils';

export const groups = new Router();
const route = '/api/v1/groups';

groups.get(route, async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: ts.getGroupQuery} = ctx;
  await validateSchema<ts.getGroupQuery>(ctx, groupSchema, query);

  let group: ts.group[] = [];
  try {
    group = await pg('groups')
      .where(query)
      .andWhereNot({type: 'hidden'})
      .select(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = group;
});
