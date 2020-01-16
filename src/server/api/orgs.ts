import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';

export const orgs = new Router();
const route = '/api/v1/orgs';
const table = 'orgs';
const dataPath = 'state.locals.data';

orgs.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});

  let orgs: tOrg[];
  try {
    orgs = await knex(table).where(query).select('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = orgs;
});
