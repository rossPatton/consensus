import Koa from 'koa';

import {knex} from '../db/connection';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getEmailsByAccountId =
async (ctx: Koa.ParameterizedContext, accountId: number): Promise<string[]> => {
  let emails = [] as string[];
  try {
    emails = await knex('accounts_emails')
      .where({accountId})
      .select(['email']);
  } catch (err) {
    ctx.throw(400, err);
  }

  return emails;
};
