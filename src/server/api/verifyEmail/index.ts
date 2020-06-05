import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {hotp, sendEmail, validateSchema} from '../../utils';
import {emailSchema} from './_schema';

export const verifyEmail = new Router();
verifyEmail.get('/email/v1/sendVerificationToken',
  async (ctx: Koa.ParameterizedContext) => {
    const {query}: {query: {email: string}} = ctx;
    await validateSchema<{email: string}>(ctx, emailSchema, query);

    const token = hotp(ctx);
    console.log('token ', token);

    const resp = await sendEmail({
      from: `Consensus <noreply@${__MAIL_DOMAIN__}>`,
      to: query.email,
      subject: 'Verify Your Email',
      text: `Enter the following authentication code in order to verify your email. This token is only valid for 10 minutes. ${token}`,
      html: `
        <h2>Enter the following authentication code in order to verify your email. This token is only valid for 10 minutes <b>${token}</b></h2>
      `,
    });

    ctx.body = resp;
  });
