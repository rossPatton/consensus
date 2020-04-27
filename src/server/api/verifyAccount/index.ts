import crypto from 'crypto';
import dayjs from 'dayjs';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {sendEmail, validateSchema} from '../../utils';
import {emailSchema, tokenSchema} from './_schema';
const dataPath = 'state.locals.data';

export const verifyAccountViaEmail = new Router();
verifyAccountViaEmail.get('/email/v1/sendVerificationToken',
  async (ctx: Koa.ParameterizedContext) => {
    const query: {email: string} = _.get(ctx, dataPath, {});
    await validateSchema<{email: string}>(ctx, emailSchema, query);

    const accountEmailRel = await knex('accounts_emails')
      .limit(1)
      .where(query)
      .first();

    // update query returns 0 or 1 status codes
    if (!accountEmailRel) {
      ctx.status = 204;
      ctx.body = {
        error: 'No account found for that email address. Are you sure you typed it correctly?',
        ok: false,
      };
      return;
    }

    const oneHourFromNow = dayjs().add(1, 'hour');
    const token = crypto.randomBytes(48).toString('hex');
    const account = await knex('accounts')
      .limit(1)
      .where({id: accountEmailRel.accountId})
      .update({
        verificationToken: token,
        verificationExpires: oneHourFromNow,
      });

    // update query returns 0 or 1
    if (!account || account === 0) {
      return ctx.throw(400, 'Something went wrong! Try again?');
    }

    const email = await sendEmail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: 'ross_patton@protonmail.com', // list of receivers
      subject: 'Verify your account', // Subject line
      text: 'Are you real?', // plain text body
      html: `
        Enter the following authentication code in order to validate your account. This token is only valid for 1 day.
        <br /><br />
        Link: https://consensus.local/verify-account/enterCode
        <br />
        Code: ${token}
      `,
    });

    ctx.body = {
      message: email.messageId,
      ok: true,
    };
  });

verifyAccountViaEmail.patch('/email/v1/verifyEmail',
  async (ctx: Koa.ParameterizedContext) => {
    const query = _.get(ctx, dataPath, {});
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

    if (!account) {
      ctx.status = 204;
      ctx.body = {
        error: 'No account found that matches that token. Are you sure you typed it correctly?',
        ok: false,
      };
      return;
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
      ctx.throw(400, err);
    }

    ctx.body = updatedAccount[0];
  });
