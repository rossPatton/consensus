import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {orgKeys} from './_constants';
import {schema} from './_schema';

export const org = new Router();
const dataPath = 'state.locals.data';
const route = '/api/v1/org';
const table = 'orgs';

org.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tGetOrgQuery = _.get(ctx, dataPath, {});

  try {
    await schema.validateAsync<tGetOrgQuery>(query);
  } catch (err) {
    const message = _.get(err, 'details[0].message', 'Bad Request');
    return ctx.throw(400, message);
  }

  let org = {} as tOrg;
  try {
    org = await knex(table)
      .limit(1)
      .where(query)
      .first()
      .select(orgKeys);
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = org;
});


org.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...newOrg} = _.get(ctx, dataPath, {});

  let updatedOrg = {} as tOrg;
  try {
    updatedOrg = await knex(table)
      .limit(1)
      .where({id: newOrg.id})
      .update(newOrg)
      .returning(orgKeys);
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = updatedOrg;
});


org.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...org} = _.get(ctx, dataPath, {});

  let newOrg = {} as tOrg;
  try {
    newOrg = await knex(table).insert(org).returning(orgKeys);
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = newOrg;
});
