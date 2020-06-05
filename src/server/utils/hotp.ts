import Koa from 'koa';
import speakeasy from 'speakeasy';

/**
 * generates a one time use code by account session
 */
export const hotp = (ctx: Koa.ParameterizedContext) => {
  const secret = speakeasy.generateSecret({length: 20});

  if (typeof ctx.session.hotpCounter === 'number') {
    ctx.session.hotpCounter += 1;
  } else {
    ctx.session.hotpCounter = 0;
  }

  const token = speakeasy.hotp({
    counter: ctx.session.hotpCounter,
    secret: secret.base32,
    encoding: 'base32',
  });

  ctx.session.hotpSecret = secret.base32;
  return token;
};
