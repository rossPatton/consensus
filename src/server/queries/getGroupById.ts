import Koa from 'koa';

import {groupKeys} from '../api/_constants';
import {knex} from '../db/connection';

export const getGroupById = async (
  ctx: Koa.ParameterizedContext,
  id: string | number): Promise<tGroup> => {

  let org = {} as tGroup;
  try {
    org = await knex('orgs')
      .limit(1)
      .where({id})
      .first()
      .select(groupKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  return org;
};
