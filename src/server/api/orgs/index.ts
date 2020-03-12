import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {orgKeys} from '../_constants';
import {knex} from '../../db/connection';
import {validateSchema} from '../../utils';
import {schema} from './_schema';

export const orgs = new Router();
const dataPath = 'state.locals.data';
const route = '/api/v1/orgs';

orgs.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  await validateSchema(ctx, schema, query);

  let orgs: tOrg[] = [];
  try {
    orgs = await knex('orgs')
      .where(query)
      .andWhereNot({type: 'hidden'})
      .select(orgKeys);
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = orgs;
});
