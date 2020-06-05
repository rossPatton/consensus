import Koa from 'koa';
import speakeasy from 'speakeasy';

// login token validation
export const hotpTokenValidates = (ctx: Koa.ParameterizedContext, token: string) => {
  const {hotpCounter, hotpSecret} = ctx.session;

  return speakeasy.hotp.verify({
    counter: hotpCounter,
    secret: hotpSecret,
    encoding: 'base32',
    token,
  });
};

type tOpts = {
  secret: string,
  token: string,
};

// 2FA token validation. authy, etc
export const totpTokenValidates = (query: tOpts) => {
  const {secret, token} = query;

  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
  });
};
