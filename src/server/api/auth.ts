import Koa from 'koa';
import passport from 'koa-passport';
import Router from 'koa-router';
import _ from 'lodash';

import {getSession} from '../queries';

export const auth = new Router();

auth.post('/auth/login', async (ctx: Koa.ParameterizedContext, next) =>
  passport.authenticate('local', async (err: Error | null, account: tAccount) => {
    if (err) ctx.throw(400, err);
    if (!account) ctx.throw(400, 'Account not found');

    const data = _.get(ctx, 'state.locals.data', {});
    await ctx.login(account);

    const {isFormSubmit} = data;
    if (isFormSubmit) return ctx.redirect('/admin/profile');

    const session = await getSession(ctx, account);
    ctx.body = session.data;
  })(ctx, next));

// logout just clears the session basically, doesnt matter how you logged in
auth.get('/auth/logout', async (ctx: Koa.ParameterizedContext, next) =>
  passport.authenticate('local', () => {
    const {isFormSubmit} = ctx.state.locals.data;
    const isAuthenticated = ctx.isAuthenticated();
    if (!isAuthenticated) return ctx.throw(400, 'You are not logged in');

    ctx.logout();
    if (isFormSubmit) return ctx.redirect('/login');

    ctx.body = {isAuthenticated: false};
  })(ctx, next));


// app.post('/auth/openid',
//   passport.authenticate('openid'));

// app.get('/auth/openid/return',
//   passport.authenticate('openid', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
