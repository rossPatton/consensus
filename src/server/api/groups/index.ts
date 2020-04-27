import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {groupKeys} from '../_constants';
import {knex} from '../../db/connection';
import {validateSchema} from '../../utils';
import {schema} from './_schema';

export const groups = new Router();
const dataPath = 'state.locals.data';
const route = '/api/v1/groups';

groups.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  await validateSchema(ctx, schema, query);

  let group: ts.group[] = [];
  try {
    group = await knex('groups')
      .where(query)
      .andWhereNot({type: 'hidden'})
      .select(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = group;
});
