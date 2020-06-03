import Koa from 'koa';

import {getProfileByAccountId} from '.';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getSession = async (
  ctx: Koa.ParameterizedContext,
): Promise<ts.thunk<ts.session<ts.user | ts.group>>> => {
  // get authentication status + active session data
  const passportSession = await ctx.redis.get(ctx.session._sessCtx.externalKey);
  // get user/org account. this object is determined by our serialization strategy
  const profile = passportSession?.passport?.user || {};

  // we return things this way to match redux-thunk on the client
  return {
    error: null,
    isLoading: false,
    data: {
      isAuthenticated: ctx.isAuthenticated(),
      profile, // user or org profile
      type: profile.type,
    },
  };
};
