import Koa from 'koa';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getSession = async (
  ctx: Koa.ParameterizedContext,
): Promise<ts.thunk<ts.session<ts.user | ts.group>>> => {
  console.log('getSession');
  console.log('getSession session => ', ctx.session);
  console.log('ctx.session._sessCtx?.session?.passport?.user => ', ctx.session._sessCtx?.session?.passport?.user);
  // console.log('ctx.session._sessCtx?.passport?.user => ', ctx.session._sessCtx?.passport?.user);
  // console.log('getSession externalKey => ', ctx.session._sessCtx.externalKey);
  // // get authentication status + active session data
  const passportSession = await ctx.redis.get(ctx?.session?._sessCtx?.externalKey);
  // console.log('ctx.session._sessCtx.session')
  // console.log('getSession passport object => ', passportSession);
  // get user/org account. this object is determined by our serialization strategy
  const profile = ctx.session._sessCtx?.session?.passport?.user || passportSession;
  console.log('getSession profile => ', profile);

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
