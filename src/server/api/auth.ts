import Koa from 'koa';
import passport from 'koa-passport';
import Router from 'koa-router';
import _ from 'lodash';

import {knex} from '../db/connection';

export const auth = new Router();

auth.post('/auth/login', async (ctx: Koa.ParameterizedContext, next) =>
  passport.authenticate('local', async (err: Error | null, account: tAccount) => {
    if (err) ctx.throw(400, err);
    if (!account) ctx.throw(400, 'Account not found');

    await ctx.login(account);

    const {orgId, userId} = account;
    let profile: any;
    if (orgId) {
      try {
        profile = await knex('orgs').limit(1).where({id: orgId}).first();
      } catch (err) {
        ctx.throw(400, err);
      }
    } else if (userId) {
      try {
        profile = await knex('users').limit(1).where({id: userId}).first();
      } catch (err) {
        ctx.throw(400, err);
      }
    }

    // newSession === session.data on the client, redux adds loading/error keys
    const newSession: tSession = {
      ...profile,
      isAuthenticated: ctx.isAuthenticated(),
      type: orgId ? 'org' : 'user',
    };

    const {isFormSubmit} = ctx.state.locals.data;
    if (isFormSubmit) return ctx.redirect('/admin/profile');

    ctx.body = newSession;
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
