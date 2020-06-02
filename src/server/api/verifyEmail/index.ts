import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';
import speakeasy from 'speakeasy';

import {sendEmail} from '../../utils';
// import {emailSchema, tokenSchema} from './_schema';

export const verifyEmail = new Router();
verifyEmail.get('/email/v1/sendVerificationToken',
  async (ctx: Koa.ParameterizedContext) => {
    const {query}: {query: {email: string, type: 'user' | 'group'}} = ctx;
    // await validateSchema<{email: string}>(ctx, emailSchema, query);

    const secret = speakeasy.generateSecret({length: 20});

    ctx.session.type = query.type;
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

    const resp = await sendEmail({
      from: `Consensus <noreply@${__MAIL_DOMAIN__}>`,
      to: query.email,
      subject: 'Verify Your Email',
      text: `Enter the following authentication code in order to verify your email. This token is only valid for 1 hour. ${token}`,
      html: `
        Enter the following authentication code in order to verify your email. This token is only valid for 1 hour: ${token}
      `,
    });

    ctx.body = resp;
  });
