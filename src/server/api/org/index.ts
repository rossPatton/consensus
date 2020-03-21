import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {groupKeys} from '../_constants';
import {knex} from '../../db/connection';
import {validateSchema} from '../../utils';
import {patchSchema, postSchema, schema} from './_schema';

export const org = new Router();
const dataPath = 'state.locals.data';
const route = '/api/v1/org';
const table = 'orgs';

org.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tGetGroupQuery = _.get(ctx, dataPath, {});
  await validateSchema<tGetGroupQuery>(ctx, schema, query);

  let org = {} as tGroup;
  try {
    org = await knex(table)
      .limit(1)
      .where(query)
      .first()
      .select(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = org;
});

org.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const {email, isFormSubmit, password, ...update} = _.get(ctx, dataPath, {});
  await validateSchema<tGroupQuery>(ctx, patchSchema, update);

  let updatedGroup = [] as tGroup[];
  try {
    updatedGroup = await knex(table)
      .limit(1)
      .where({id: update.id})
      .update(update)
      .returning(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = {
    ...updatedGroup[0],
    email,
  };
});

org.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...group} = _.get(ctx, dataPath, {});
  await validateSchema<tGroupQuery>(ctx, postSchema, group);

  // create the cooresponding account first =>
  // try {
  //   await knex('accounts').insert(group).returning(groupKeys);
  // } catch (err) {
  //   return ctx.throw(400, err);
  // }

  // let newGroup = {} as tGroup;
  // try {
  //   newGroup = await knex(table).insert(group).returning(groupKeys);
  // } catch (err) {
  //   return ctx.throw(500, err);
  // }

  ctx.body = {ok: true}; // newGroup;
});
