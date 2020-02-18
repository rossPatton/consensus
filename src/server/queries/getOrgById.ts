import Koa from 'koa';

import {orgKeys} from '../api/org/_constants';
import {knex} from '../db/connection';

export const getOrgById = async (
  ctx: Koa.ParameterizedContext,
  id: string | number): Promise<tOrg> => {

  let org = {} as tOrg;
  try {
    org = await knex('orgs')
      .limit(1)
      .where({id})
      .first()
      .select(orgKeys);
  } catch (err) {
    return ctx.throw(400, err);
  }

  return org;
};
