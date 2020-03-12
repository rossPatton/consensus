import Koa from 'koa';

import {getEmailsByAccountId, getProfileByAccountId} from '.';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getSession = async (
  ctx: Koa.ParameterizedContext,
  account: tAccount,
): Promise<tThunk<tSession<tUser | tOrg>>> => {
  // we have 2 types of accounts,
  // orgs and users, use account info to fetch the right one
  const profile = await getProfileByAccountId(ctx, account);

  let emails = [] as tEmails;
  if (account.id) {
    emails = await getEmailsByAccountId(ctx, account.id);
  }

  // for roles, etc, we want id here to be from the account, not the profile
  const {deletionDeadline, id, isVerified, login, orgId, privateEmail} = account;

  // we return things this way to match redux-thunk on the client
  return {
    error: null,
    isLoading: false,
    data: {
      deletionDeadline,
      emails,
      id, // account.id
      isAuthenticated: ctx.isAuthenticated(),
      isVerified, // has the account been verified yet
      login, // unique login for account
      privateEmail,
      profile, // user or org profile
      type: orgId ? 'org' : 'user', // account type
    },
  };
};
