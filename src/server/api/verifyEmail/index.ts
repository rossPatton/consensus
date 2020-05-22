import crypto from 'crypto';
import dayjs from 'dayjs';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {sendEmail, validateSchema} from '../../utils';
import {emailSchema, tokenSchema} from './_schema';

export const verifyEmail = new Router();
verifyEmail.get('/email/v1/sendVerificationToken',
  async (ctx: Koa.ParameterizedContext) => {
    const query: {email: string} = ctx?.state?.locals?.data;
    await validateSchema<{email: string}>(ctx, emailSchema, query);

    const oneHourFromNow = dayjs().add(1, 'hour');
    const token = crypto.randomBytes(48).toString('hex');
    const account = await knex('accounts')
      .limit(1)
      .where(query)
      .update({
        verificationToken: token,
        verificationExpires: oneHourFromNow,
      });

    // update query returns 0 or 1
    if (!account || account === 0) {
      return ctx.throw(500, 'Something went wrong! Try again?');
    }

    const resp = await sendEmail({
      from: `Consensus <noreply@${__MAIL_DOMAIN__}>`,
      to: query.email,
      subject: 'Verify Your Email',
      text: `Enter the following authentication code in order to verify your email. This token is only valid for 1 hour. ${token}`,
      html: `
        Enter the following authentication code in order to verify your email. This token is only valid for 1 day.
        <br /><br />
        Link: https://consensus.local/verify-email/enterCode
        <br />
        Code: ${token}
      `,
    });

    ctx.body = resp;
  });

verifyEmail.patch('/email/v1/verifyEmail',
  async (ctx: Koa.ParameterizedContext) => {
    const query = ctx?.state?.locals?.data;
    await validateSchema(ctx, tokenSchema, query);

    let account: ts.account;
    try {
      account = await knex('accounts')
        .limit(1)
        .where({verificationToken: query.token})
        .select(['verificationExpires'])
        .first();
    } catch (err) {
      ctx.throw(400, err);
    }

    // update query returns 0 or 1.
    // maybe user entered a valid query, but for another account?
    if (!account) {
      return ctx.throw(500, 'No account found that matches that token. Are you sure you typed it correctly?');
    }

    const hasTokenExpired = dayjs().isAfter(account.verificationExpires);
    if (hasTokenExpired) {
      ctx.throw(400, 'This reset token has expired. Please get a new one.');
    }

    let updatedAccount: ts.account[];
    try {
      updatedAccount = await knex('accounts')
        .limit(1)
        .where({verificationToken: query.token})
        .update({
          isVerified: true,
          verificationToken: null,
          verificationExpires: null,
        })
        .returning('isVerified');
    } catch (err) {
      ctx.throw(500, err);
    }

    ctx.body = updatedAccount?.[0];
  });
