import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {groupKeys} from '../_constants';
import {knex} from '../../db/connection';
import {encrypt, saltedHash, validateSchema} from '../../utils';
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
  console.log('group => ', group);
  await validateSchema<tGroupQuery>(ctx, postSchema, group);

  const {login, password, ...groupToInsert} = group;

  // create the group first =>
  let newGroupReturning = [] as tGroup[];
  try {
    newGroupReturning = await knex(table)
      .insert(groupToInsert)
      .returning('*');
  } catch (err) {
    return ctx.throw(500, err);
  }

  let hashedPW = null;
  try {
    hashedPW = await saltedHash(group.password);
  } catch (err) {
    return ctx.throw(500, err);
  }

  const newGroup = newGroupReturning[0];

  // then the cooresponding account for login
  try {
    await knex('accounts').insert({
      login: group.login,
      orgId: newGroup.id,
      password: encrypt(hashedPW),
    });
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = newGroup;
});
