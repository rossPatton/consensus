import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {schema} from './_schema';

export const org = new Router();
const dataPath = 'state.locals.data';
const route = '/api/v1/org';
const table = 'orgs';

org.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tOrgRouteParams = _.get(ctx, 'state.locals.data', {});
  const isValidated = await schema.validateAsync({ whatever: 'abc', testValue: null });
  console.log('isValidated => ', isValidated);
  const isActuallyValidated = await schema.validateAsync({ testValue: '12345' });
  console.log('isActuallyValidated => ', isActuallyValidated);

  try {
    await schema.validateAsync({ whatever: 'abc', testValue: null });
  } catch (err) {
    const message = Error(_.get(err, 'details[0].message', 'Bad Request'));
    return ctx.throw(400, message);
  }

  let org: tOrg;
  try {
    org = await knex(table)
      .limit(1)
      .where({id: query.id})
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  ctx.body = org;
});


org.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...newOrg} = _.get(ctx, dataPath, {});

  let updatedOrg: tOrg[];
  try {
    updatedOrg = await knex(table)
      .limit(1)
      .where({id: newOrg.id})
      .update(newOrg)
      .returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  const {createdAt, email, updatedAt, ...safeOrg} = updatedOrg[0];
  ctx.body = safeOrg;
});


org.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...org} = _.get(ctx, dataPath, {});

  let newOrg: tOrg[];
  try {
    newOrg = await knex(table).insert(org).returning('*');
  } catch (err) {
    return ctx.throw(400, err);
  }

  const {createdAt, email, updatedAt, ...safeOrg} = newOrg[0];
  ctx.body = safeOrg;
});
