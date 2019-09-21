import Koa from 'koa';

import {getProfileByAccount, getRolesByAccountId, getRSVPsByUserId} from '.';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getSession = async (
  ctx: Koa.ParameterizedContext,
  account: tAccount): Promise<tThunk<tSession>> => {

  // we have 2 types of accounts, orgs and users
  const profile = await getProfileByAccount(ctx, account);

  // users can different levels of roles within an org. orgs have 1 role - admin
  const roles = await getRolesByAccountId(ctx, account.id);

  // we return things this way to match redux-thunk on the client
  return {
    error: null,
    isLoading: false,
    data: {
      ...profile,
      isAuthenticated: ctx.isAuthenticated(),
      roles,
      type: account.orgId ? 'org' : 'user',
    },
  };
};
