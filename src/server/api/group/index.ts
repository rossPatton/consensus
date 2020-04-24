import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {groupKeys} from '../_constants';
import {knex} from '../../db/connection';
import {encrypt, isValidPw, saltedHash, sha256, validateSchema} from '../../utils';
import {patchSchema, postSchema, schema} from './_schema';

export const group = new Router();
const dataPath = 'state.locals.data';
const route = '/api/v1/group';
const table = 'groups';

group.get(route, async (ctx: Koa.ParameterizedContext) => {
  const query: tGetGroupQuery = _.get(ctx, dataPath, {});
  await validateSchema<tGetGroupQuery>(ctx, schema, query);

  let group = {} as tGroup;
  try {
    group = await knex(table)
      .limit(1)
      .where(query)
      .first()
      .select(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = group;
});

group.patch(route, async (ctx: Koa.ParameterizedContext) => {
  const query = _.get(ctx, dataPath, {});
  await validateSchema<tGroupQuery>(ctx, patchSchema, query);

  const loggedInAccount: tAccount = _.get(ctx, 'state.user', {});
  const {avatarEmail, isFormSubmit, password, ...updateQuery} = query;

  const isValidPW = await isValidPw(password, loggedInAccount.password);
  if (!isValidPW) return ctx.throw(400, 'Password is not correct');

  if (typeof avatarEmail === 'string') {
    updateQuery.avatarHash = sha256(avatarEmail);
  }

  let updatedGroup = [] as tGroup[];
  try {
    updatedGroup = await knex(table)
      .limit(1)
      .where({id: updateQuery.id})
      .update(updateQuery)
      .returning(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = updatedGroup[0];
});

group.post(route, async (ctx: Koa.ParameterizedContext) => {
  const {isFormSubmit, ...group} = _.get(ctx, dataPath, {});
  await validateSchema<tGroupQuery>(ctx, postSchema, group);

  const {login, password, ...groupToInsert} = group;

  // create the group first =>
  let newGroupReturning = [] as tGroup[];
  try {
    newGroupReturning = await knex(table)
      .insert({isNew: true, ...groupToInsert})
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
      groupId: newGroup.id,
      password: encrypt(hashedPW),
    });
  } catch (err) {
    return ctx.throw(500, err);
  }

  ctx.body = newGroup;
});
