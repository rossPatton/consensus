import Koa from 'koa';

import {qr} from '~app/server/utils';

// use login info to return session for client
// ideally only happens once per visit, on login. but if user refreshes, we do again
export const getSession = async (
  ctx: Koa.ParameterizedContext,
  defaultProfile?: ts.user | ts.group,
): Promise<ts.thunk<ts.session<ts.user | ts.group>>> => {
  const passportSession = await ctx.redis.get(ctx?.session?._sessCtx?.externalKey);
  const profile = defaultProfile
    || ctx.session._sessCtx?.session?.passport?.user
    || passportSession;

  const qrcode = ctx.isAuthenticated() ? await qr(ctx) : {};
  const type = profile?.sessionType || 'user';

  // we return things this way to match redux-thunk on the client
  return {
    error: null,
    fetched: true,
    isLoading: false,
    data: {
      isAuthenticated: ctx.isAuthenticated(),
      profile, // user or group profile
      qr: qrcode,
      type,
    },
  };
};
