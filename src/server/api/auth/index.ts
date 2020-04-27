import Koa from 'koa';
import passport from 'koa-passport';
import Router from 'koa-router';
import _ from 'lodash';

import {getSession} from '../../queries';
import {validateSchema} from '../../utils';
import {schema} from './_schema';

export const auth = new Router();


auth.post('/auth/v1/login', async (ctx: Koa.ParameterizedContext, next) =>
  passport.authenticate('local', async (
    err: Error | null,
    account: ts.account) => {
    if (err) ctx.throw(400, err);
    if (!account) ctx.throw(400, 'Account not found');
    await validateSchema<ts.account>(ctx, schema, account);

    const query = ctx?.state?.locals?.data;
    await ctx.login(account);

    const {isFormSubmit} = query;
    if (isFormSubmit) {
      if (account.isNew) {
        return ctx.redirect('/admin/profile');
      }
      return ctx.redirect('/admin/meetings');

    }

    const session = await getSession(ctx, account);
    ctx.body = session.data;
  })(ctx, next));

// logout just clears the session basically, doesnt matter how you logged in
auth.get('/auth/v1/logout', async (ctx: Koa.ParameterizedContext, next) =>
  passport.authenticate('local', () => {
    const {isFormSubmit} = ctx?.state?.locals?.data;
    const isAuthenticated = ctx.isAuthenticated();
    if (!isAuthenticated) return ctx.throw(400, 'You are not logged in');

    ctx.logout();
    if (isFormSubmit) return ctx.redirect('/login');

    ctx.body = {isAuthenticated: false};
  })(ctx, next));


// app.post('/auth/v1/openid',
//   passport.authenticate('openid'));

// app.get('/auth/v1/openid/return',
//   passport.authenticate('openid', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
