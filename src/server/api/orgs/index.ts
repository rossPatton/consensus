import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {orgKeys} from './_constants';
import {schema} from './_schema';

export const orgs = new Router();
const route = '/api/v1/orgs';
const table = 'orgs';
const dataPath = 'state.locals.data';

orgs.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});

  try {
    await schema.validateAsync<tGetOrgQuery>(query);
  } catch (err) {
    const message = _.get(err, 'details[0].message', 'Bad Request');
    return ctx.throw(400, message);
  }

  let orgs: tOrg[] = [];
  try {
    orgs = await knex(table).where(query).select(orgKeys);
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = orgs;
});
