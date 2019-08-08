import Koa from 'koa';
import Router from 'koa-router';
import passport from 'koa-passport';
import { knex } from '../db/connection';

export const auth = new Router();

// @ts-ignore
auth.post('user login', '/auth/user/login', async (ctx: Koa.Context) => {
  // @ts-ignore
  return passport.authenticate('local', async (_, unsafeUser: tUser) => {
    if (!unsafeUser) ctx.throw(400, 'User not found');

    const { password, ...safeUser } = unsafeUser;
    await ctx.login(safeUser);

    const userOrgRels = await knex('users_orgs').where({userId: safeUser.id});
    const roles = userOrgRels.map((userOrgRel: tUserOrgRelation) => ({
      orgId: userOrgRel.orgId,
      role: userOrgRel.role,
    }));

    const newSession: tSession = {
      ...safeUser,
      isAuthenticated: await ctx.isAuthenticated(),
      roles,
    };

    ctx.status = 200;
    ctx.body = newSession;
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
