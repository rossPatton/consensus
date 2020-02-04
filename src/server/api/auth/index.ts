import Koa from 'koa';
import passport from 'koa-passport';
import Router from 'koa-router';
import _ from 'lodash';

import {getSession} from '../../queries';
import {schema} from './_schema';

export const auth = new Router();
const dataPath = 'state.locals.data';

auth.post('/auth/login', async (ctx: Koa.ParameterizedContext, next) =>
  passport.authenticate('local', async (err: Error | null, account: tAccount) => {
    if (err) ctx.throw(400, err);
    if (!account) ctx.throw(400, 'Account not found');

    try {
      await schema.validateAsync(account);
    } catch (err) {
      const message = _.get(err, 'details[0].message', 'Bad Request');
      return ctx.throw(400, message);
    }

    const query = _.get(ctx, dataPath, {});
    await ctx.login(account);

    const {isFormSubmit} = query;
    if (isFormSubmit) return ctx.redirect('/admin/profile');

    const session = await getSession(ctx, account);
    ctx.body = session.data;
  })(ctx, next));

// logout just clears the session basically, doesnt matter how you logged in
auth.get('/auth/logout', async (ctx: Koa.ParameterizedContext, next) =>
  passport.authenticate('local', () => {
    const {isFormSubmit} = _.get(ctx, dataPath, {});
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
