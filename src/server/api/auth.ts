import Koa from 'koa';
import Router from 'koa-router';
import passport from 'koa-passport';
import { knex } from '../db/connection';
import { decrypt, encrypt } from '../utils';

export const auth = new Router();

// @ts-ignore
auth.post('user login', '/auth/login', async (ctx: Koa.Context, next) => {
  return passport.authenticate('local', async (err: Error | null, unsafeUser: tUser) => {
    if (err) ctx.throw(400, err);
    if (!unsafeUser) ctx.throw(400, 'User not found');

    try {
      await ctx.login(unsafeUser);
      const { password, ...safeUser } = unsafeUser;

      // @TODO consolidate this session logic
      const userOrgRels = await knex('users_orgs').where({userId: safeUser.id});
      const userEventRels = await knex('users_events').where({userId: safeUser.id});

      const roles = userOrgRels.map((rel: tUserOrgRelation) => ({
        orgId: rel.orgId,
        role: rel.role,
      }));

      const rsvps = userEventRels.map((rel: tUserEventRelation) => ({
        eventId: rel.eventId,
        status: {
          didAttend: rel.didAttend,
          isGoing: rel.isGoing,
        },
      }));

      const isAuthenticated = ctx.isAuthenticated();

      // newSession === session.data on the client, redux adds loading/error keys
      const newSession: tSession = {
        ...safeUser,
        isAuthenticated,
        roles,
        rsvps,
      };

      if (!ctx.query.client) {
        ctx.redirect('/admin');
      } else {
        ctx.status = 200;
        ctx.body = newSession;
      }
    } catch (err) {
      ctx.throw('400', err);
    }
  })(ctx, next);
});

// logout just clears the session basically, doesnt matter how you logged in
// @ts-ignore
auth.get('logout', '/auth/logout', async (ctx: Koa.Context, next) => {
  return passport.authenticate('local', () => {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      ctx.redirect('/login');
    } else {
      ctx.body = {error: 'You are not logged in'};
      ctx.throw(401);
    }
  })(ctx, next);
});

// app.post('/auth/openid',
//   passport.authenticate('openid'));

// app.get('/auth/openid/return',
//   passport.authenticate('openid', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
