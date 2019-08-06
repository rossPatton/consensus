import Koa from 'koa';
import Router from 'koa-router';
import passport from 'koa-passport';

export const auth = new Router();

// @ts-ignore
auth.post('user login', '/auth/user/login', async (ctx: Koa.Context) => {
  // @ts-ignore
  return passport.authenticate('local', (_, unsafeUser: tUser) => {
    if (!unsafeUser) ctx.throw(400, 'User not found');

    const { password, ...safeUser } = unsafeUser;

    ctx.login(safeUser);
    ctx.status = 200;
    ctx.body = {
      ...safeUser,
      isAuthenticated: ctx.isAuthenticated(),
    };
  })(ctx);
});

// logout just clears the session basically, doesnt matter how you logged in
// @ts-ignore
auth.get('logout', '/auth/logout', async (ctx: Koa.Context) => {
  // @ts-ignore
  return passport.authenticate('local', () => {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      ctx.redirect('/');
      ctx.body = { isAuthenticated: false };
    } else {
      ctx.body = { message: 'You are not logged in' };
      ctx.throw(401);
    }
  })(ctx);
});

// app.post('/auth/openid',
//   passport.authenticate('openid'));

// app.get('/auth/openid/return',
//   passport.authenticate('openid', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
