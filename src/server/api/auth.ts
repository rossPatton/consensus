import Koa from 'koa';
import passport from 'koa-passport';
import Router from 'koa-router';
import _ from 'lodash';

export const auth = new Router();

auth.post('/auth/login', async (ctx: Koa.ParameterizedContext, next) =>
  passport.authenticate('local', async (err: Error | null, unsafeUser: tUser) => {
    if (err) ctx.throw(400, err);
    if (!unsafeUser) ctx.throw(400, 'User not found');

    await ctx.login(unsafeUser);

    // newSession === session.data on the client, redux adds loading/error keys
    const { password, ...safeUser } = unsafeUser;
    const newSession: tSession = {
      ...safeUser,
      isAuthenticated: ctx.isAuthenticated(),
    };

    const {isFormSubmit} = ctx.state.locals.data;
    if (isFormSubmit) return ctx.redirect('/admin/profile');

    ctx.status = 200;
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

    ctx.status = 200;
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
