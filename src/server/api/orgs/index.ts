import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {groupKeys} from '../_constants';
import {knex} from '../../db/connection';
import {validateSchema} from '../../utils';
import {schema} from './_schema';

export const orgs = new Router();
const dataPath = 'state.locals.data';
const route = '/api/v1/orgs';

orgs.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  await validateSchema(ctx, schema, query);

  let orgs: tGroup[] = [];
  try {
    orgs = await knex('orgs')
      .where(query)
      .andWhereNot({type: 'hidden'})
      .select(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = orgs;
});
