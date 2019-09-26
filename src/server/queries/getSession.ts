import Koa from 'koa';

import {getProfileByAccount, getRolesByAccountId, getRSVPsByUserId} from '.';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getSession = async (
  ctx: Koa.ParameterizedContext,
  account: tAccount): Promise<tThunk<tSession>> => {

  // we have 2 types of accounts, orgs and users
  const profile = await getProfileByAccount(ctx, account);

  // for roles, etc, we want id here to be from the account, not the profile
  const {id, orgId, userId} = account;

  // for rsvps, other stuff, we want to use the profile id
  // (technically, rsvps are user only, but who knows what things will look later)
  const profileId = orgId as number || userId as number;

  // we return things this way to match redux-thunk on the client
  return {
    error: null,
    isLoading: false,
    data: {
      ...profile,
      id,
      isAuthenticated: ctx.isAuthenticated(),
      profileId,
      type: orgId ? 'org' : 'user',
    },
  };
};
