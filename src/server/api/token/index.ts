import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {getSession} from '~app/server/queries';
import {hotp, sendEmail, totpTokenValidates, validateSchema} from '~app/server/utils';

import {emailSchema, tokenSchema} from './_schema';

export const tokenSend = new Router();
export const tokenValidate = new Router();

// email otp token to user, this is verification before login only
tokenSend.get('/api/v1/sendToken', async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: {email: string}} = ctx;
  await validateSchema<{email: string}>(ctx, emailSchema, query);

  const token = hotp(ctx);
  console.log('token => ', token);
  const resp = await sendEmail(ctx, {
    from: `Consensus <noreply@${__MAIL_DOMAIN__}>`,
    to: query.email,
    subject: 'Verify Your Email',
    text: `Enter the following authentication code in order to verify your email. ${token}`,
    html: `
      <h2>Enter the following authentication code in order to verify your email. <b>${token}</b></h2>
    `,
  });

  ctx.body = resp;
});

// if user has 2fa turned on, we use their saved secret to validate it
// this is verification after login only
tokenValidate.get('/api/v1/validateToken', async (ctx: Koa.ParameterizedContext) => {
  const {query}: {query: {token: string}} = ctx;
  await validateSchema<{token: string}>(ctx, tokenSchema, query);
  const {otpSecret} = ctx?.session?.temp_user as ts.baseAccount;

  const isTokenValid = totpTokenValidates({
    secret: otpSecret,
    token: query.token,
  });

  if (!isTokenValid) {
    return ctx.throw(401, 'Token is not valid');
  }

  ctx.session.otpValid = true;
  ctx.login(ctx?.session?.temp_user);
  const session = await getSession(ctx);
  ctx.body = session;
});
