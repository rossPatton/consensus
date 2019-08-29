import Koa from 'koa';
import passport from 'koa-passport';
import Router from 'koa-router';
import _ from 'lodash';

import { knex } from '../db/connection';

export const auth = new Router();

// @ts-ignore
auth.post('user login', '/auth/login', async (ctx: Koa.Context, next) => {
  return passport.authenticate('local', async (err: Error | null, unsafeUser: tUser) => {
    if (err) ctx.throw(400, err);
    if (!unsafeUser) ctx.throw(400, 'User not found');

    await ctx.login(unsafeUser);

    const { password, ...safeUser } = unsafeUser;
    let userOrgRels: tUserOrgRelation[];
    try {
      // @TODO consolidate this session logic
      userOrgRels = await knex('users_orgs').where({userId: safeUser.id});
    } catch (err) {
      return ctx.throw(400, err);
    }

    let userEventRels: tUserEventRelation[];
    try {
      userEventRels = await knex('users_events').where({userId: safeUser.id});
    } catch (err) {
      return ctx.throw(400, err);
    }

    const roles = userOrgRels.map((rel: tUserOrgRelation) => ({
      orgId: rel.orgId,
      role: rel.role,
    }));

    const rsvps = userEventRels.map((rel: tUserEventRelation) => ({
      eventId: rel.eventId,
      rsvp: rel.rsvp,
    }));

    // newSession === session.data on the client, redux adds loading/error keys
    const newSession: tSession = {
      ...safeUser,
      isAuthenticated: ctx.isAuthenticated(),
    };

    if (roles && roles.length > 0) {
      newSession.roles = roles;
    }

    if (rsvps && rsvps.length > 0) {
      newSession.rsvps = rsvps;
    }

    const {isFormSubmit} = ctx.state.locals.data;
    if (isFormSubmit) return ctx.redirect('/admin');

    ctx.status = 200;
    ctx.body = newSession;
  })(ctx, next);
});

// logout just clears the session basically, doesnt matter how you logged in
// @ts-ignore
auth.get('logout', '/auth/logout', async (ctx: Koa.Context, next) => {
  return passport.authenticate('local', () => {
    const {isFormSubmit} = ctx.state.locals.data;
    const isAuthenticated = ctx.isAuthenticated();

    if (!isAuthenticated) return ctx.throw(400, 'You are not logged in');

    ctx.logout();
    if (isFormSubmit) return ctx.redirect('/login');

    ctx.status = 200;
    ctx.body = {isAuthenticated: false};
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
