import Koa from 'koa';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getSession = async (
  ctx: Koa.ParameterizedContext,
): Promise<ts.thunk<ts.session<ts.user | ts.group>>> => {
  const passportSession = await ctx.redis.get(ctx?.session?._sessCtx?.externalKey);
  const profile = ctx.session._sessCtx?.session?.passport?.user || passportSession;

  // we return things this way to match redux-thunk on the client
  return {
    error: null,
    isLoading: false,
    data: {
      isAuthenticated: ctx.isAuthenticated(),
      profile, // user or group profile
      type: profile?.sessionType || 'user',
    },
  };
};
