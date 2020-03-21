import crypto from 'crypto';
import dayjs from 'dayjs';
import Koa from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../../db/connection';
import {encrypt, saltedHash, sendEmail, validateSchema} from '../../utils';
import {emailSchema, tokenSchema} from './_schema';

const dataPath = 'state.locals.data';

export const passwordResetViaEmail = new Router();
passwordResetViaEmail.get('/email/v1/emailResetToken',
  async (ctx: Koa.ParameterizedContext) => {
    const query: {email: string} = _.get(ctx, dataPath, {});
    await validateSchema<{email: string}>(ctx, emailSchema, query);

    let accountEmailRel: tEmail;
    try {
      accountEmailRel = await knex('accounts_emails')
        .limit(1)
        .where(query)
        .first();
    } catch (err) {
      ctx.throw(500, err);
    }

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
    let account: tAccount | number;
    try {
      account = await knex('accounts')
        .limit(1)
        .where({id: accountEmailRel.accountId})
        .update({
          passwordResetToken: token,
          passwordResetExpires: oneHourFromNow,
        });
    } catch (err) {
      ctx.throw(500, err);
    }

    // update query returns 0 or 1.
    // maybe user entered a valid query, but for another account?
    if (!account || account === 0) {
      return ctx.throw(400, 'Something went wrong! Try again?');
    }

    const email = await sendEmail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: 'ross_patton@protonmail.com', // list of receivers
      subject: 'Password Reset', // Subject line
      text: 'Hello world?', // plain text body
      html: `
      Enter the following authentication code in order to reset your password. This token is only valid for 1 day.
      <br /><br />
      Link: https://consensus.local/password-reset/enterCode
      <br />
      Code: ${token}
    `,
    });

    ctx.body = {
      message: email.messageId,
      ok: true,
    };
  });

passwordResetViaEmail.patch('/email/v1/resetPasswordByEmail',
  async (ctx: Koa.ParameterizedContext) => {
    const query = _.get(ctx, dataPath, {});
    await validateSchema(ctx, tokenSchema, query);

    let account: tAccount;
    try {
      account = await knex('accounts')
        .limit(1)
        .where({passwordResetToken: query.token})
        .select(['passwordResetExpires'])
        .first();
    } catch (err) {
      ctx.throw(500, err);
    }

    if (!account) {
      ctx.status = 204;
      ctx.body = {
        error: 'No account found that matches that token. Are you sure you typed it correctly?',
        ok: false,
      };
      return;
    }

    const hasTokenExpired = dayjs().isAfter(account.passwordResetExpires);
    if (hasTokenExpired) {
      ctx.throw(400, 'This reset token has expired.');
    }

    let updatedAccount = {};
    let safePW = await saltedHash(query.password);
    safePW = encrypt(safePW);

    try {
      updatedAccount = await knex('accounts')
        .limit(1)
        .where({passwordResetToken: query.token})
        .update({
          password: safePW,
          passwordResetToken: null,
          passwordResetExpires: null,
        });
    } catch (err) {
      ctx.throw(500, err);
    }

    ctx.body = updatedAccount;
  });
