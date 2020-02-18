import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {orgKeys} from './_constants';
import {schema} from './_schema';

export const orgs = new Router();
const dataPath = 'state.locals.data';
const route = '/api/v1/orgs';

orgs.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  console.log('query => ', query);

  try {
    await schema.validateAsync(query);
  } catch (err) {
    const message = _.get(err, 'details[0].message', 'Bad Request');
    return ctx.throw(400, message);
  }

  let orgs: tOrg[] = [];
  try {
    orgs = await knex('orgs').where(query).select(orgKeys);
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = orgs;
});
