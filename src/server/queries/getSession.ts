import Koa from 'koa';

import {getProfileByAccountId} from '.';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getSession = async (
  ctx: Koa.ParameterizedContext,
  account: ts.account,
): Promise<ts.thunk<ts.session<ts.user | ts.group>>> => {
  // we have 2 types of accounts,
  // group and users, use account info to fetch the right one
  const profile = await getProfileByAccountId(ctx, account);

  // we return things this way to match redux-thunk on the client
  return {
    error: null,
    isLoading: false,
    data: {
      deletionDeadline: account.deletionDeadline,
      email: account.email,
      id: account.id,
      isAuthenticated: ctx.isAuthenticated(),
      isNew: account.isNew,
      isVerified: account.isVerified, // has the account been verified yet
      login: account.login, // unique login for account
      privateEmail: account.privateEmail,
      profile, // user or org profile
      type: account.groupId ? 'group' : 'user', // account type
    },
  };
};
