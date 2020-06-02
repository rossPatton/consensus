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
    // await validateSchema<ts.account>(ctx, schema, account);
    await ctx.login(account);
    const session = await getSession(ctx, account);
    ctx.body = session.data;
  })(ctx, next));

// logout just clears the session basically, doesnt matter how you logged in
auth.get('/auth/v1/logout', async (ctx: Koa.ParameterizedContext, next) =>
  passport.authenticate('local', () => {
    const isAuthenticated = ctx.isAuthenticated();
    if (!isAuthenticated) return ctx.throw(400, 'You are not logged in');
    ctx.logout();
    ctx.body = {isAuthenticated: false};
  })(ctx, next));
