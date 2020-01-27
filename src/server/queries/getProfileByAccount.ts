import Koa from 'koa';

import {knex} from '../db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getProfileByAccount = async (
  ctx: Koa.ParameterizedContext,
  account: tAccount): Promise<tOrg | tUser> => {
  const {orgId, userId} = account;

  let profile: tOrg | tUser;
  if (orgId) {
    try {
      profile = await knex('orgs').limit(1).where({id: orgId}).first();
    } catch (err) {
      ctx.throw(400, err);
    }
  } else if (userId) {
    try {
      profile = await knex('users').limit(1).where({id: userId}).first();
    } catch (err) {
      ctx.throw(400, err);
    }
  }

  return profile;
};
