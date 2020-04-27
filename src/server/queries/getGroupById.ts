import Koa from 'koa';

import {groupKeys} from '../api/_constants';
import {knex} from '../db/connection';

export const getGroupById = async (
  ctx: Koa.ParameterizedContext,
  id: string | number): Promise<ts.group> => {

  let group = {} as ts.group;
  try {
    group = await knex('groups')
      .limit(1)
      .where({id})
      .first()
      .select(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  return group;
};
