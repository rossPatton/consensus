import Koa from 'koa';

import {knex} from '../db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getProfileByAccountId = async (
  ctx: Koa.ParameterizedContext,
  account: ts.account): Promise<ts.group | ts.user> => {
  const {id} = account;
  const {type} = ctx.session;

  let profile: ts.group | ts.user;
  if (type === 'group') {
    try {
      profile = await knex('groups')
        .limit(1)
        .where({id})
        .first();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else if (type === 'user') {
    try {
      profile = await knex('users')
        .limit(1)
        .where({id})
        .first();
    } catch (err) {
      ctx.throw(500, err);
    }
  }

  return profile;
};
