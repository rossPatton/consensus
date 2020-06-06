import Koa from 'koa';
import passport from 'koa-passport';
import Router from 'koa-router';
import _ from 'lodash';

import {getSession} from '../../queries';
import {validateSchema} from '../../utils';
import {groupSchema, userSchema} from './_schema';

export const auth = new Router();

auth.post('/auth/v1/login', async (ctx: Koa.ParameterizedContext, next) =>
  passport.authenticate('local', async (
    err: Error | null,
    account: ts.user | ts.group) => {
    if (err) ctx.throw(400, err);
    if (!account) ctx.throw(400, 'Account not found');
    if (account.sessionType === 'user') {
      await validateSchema<ts.user | ts.group>(ctx, userSchema, account);
    } else if (account.sessionType === 'group') {
      await validateSchema<ts.user | ts.group>(ctx, groupSchema, account);
    }

    // if (!!account.otpSecret && !ctx.session.otpValid) {
    //   ctx.body = {
    //     error: null,
    //     fetched: false,
    //     isLoading: false,
    //     data: {
    //       isAuthenticated: false,
    //       requireOtp: true,
    //     },
    //   };
    //   ctx.session.temp_user = account;

    // } else {
    await ctx.login(account);
    const session = await getSession(ctx);
    // ctx.session.otpValid = false;
    // ctx.session.temp_user = {};
    ctx.body = session;
    // }
  })(ctx, next));

// logout just clears the session basically, doesnt matter how you logged in
auth.get('/auth/v1/logout', async (ctx: Koa.ParameterizedContext, next) =>
  passport.authenticate('local', () => {
    const isAuthenticated = ctx.isAuthenticated();
    if (!isAuthenticated) return ctx.throw(400, 'You are not logged in');

    ctx.session.otpValid = false;
    ctx.session.temp_user = {};

    ctx.logout();
    ctx.body = {isAuthenticated: false};
  })(ctx, next));
