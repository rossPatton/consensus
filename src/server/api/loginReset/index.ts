import crypto from 'crypto';
import dayjs from 'dayjs';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {sendEmail, validateSchema} from '../../utils';
import {emailSchema, tokenSchema} from './_schema';

export const loginResetViaEmail = new Router();
loginResetViaEmail.get('/email/v1/emailLoginResetToken',
  async (ctx: Koa.ParameterizedContext) => {
    const query: {email: string} = ctx?.state?.locals?.data;
    await validateSchema<{email: string}>(ctx, emailSchema, query);

    const oneHourFromNow = dayjs().add(1, 'hour');
    const token = crypto.randomBytes(48).toString('hex');
    let account: ts.account | number;
    try {
      account = await knex('accounts')
        .limit(1)
        .where(query)
        .update({
          loginResetToken: token,
          loginResetExpires: oneHourFromNow,
        });
    } catch (err) {
      ctx.throw(500, err);
    }

    // update query returns 0 or 1.
    // maybe user entered a valid query, but for another account?
    if (!account || account === 0) {
      return ctx.throw(500, 'Something went wrong! Try again?');
    }

    const resp = await sendEmail({
      from: `Consensus <noreply@${__MAIL_DOMAIN__}>`,
      to: query.email,
      subject: 'Reset Your Login ',
      text: `Enter the following authentication code in order to reset your secret login. This token is only valid for 1 hour. Code: ${token}`,
      html: `
      Enter the following authentication code in order to reset your login. This token is only valid for 1 hour.
      <br /><br />
      Link: https://consensus.local/login-reset/enterCode
      <br />
      Code: ${token}
    `,
    });

    ctx.body = resp;
  });

loginResetViaEmail.patch('/email/v1/resetLoginByEmail',
  async (ctx: Koa.ParameterizedContext) => {
    const query = ctx?.state?.locals?.data;
    await validateSchema(ctx, tokenSchema, query);

    let account: ts.account;
    try {
      account = await knex('accounts')
        .limit(1)
        .where({loginResetToken: query.token})
        .select(['loginResetExpires'])
        .first();
    } catch (err) {
      ctx.throw(500, err);
    }

    if (!account) {
      return ctx.throw(500, 'No account found that matches that token. Are you sure you typed it correctly?');
    }

    const hasTokenExpired = dayjs().isAfter(account.loginResetExpires);
    if (hasTokenExpired) {
      return ctx.throw(400, 'This reset token has expired.');
    }

    let updatedAccount = {};
    try {
      updatedAccount = await knex('accounts')
        .limit(1)
        .where({loginResetToken: query.token})
        .update({
          login: query.login,
          loginResetToken: null,
          passwordResetExpires: null,
        });
    } catch (err) {
      ctx.throw(500, err);
    }

    ctx.body = updatedAccount;
  });
