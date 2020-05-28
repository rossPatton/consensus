import Koa from 'koa';
import passport from 'koa-passport';
import Router from 'koa-router';
import _ from 'lodash';

import {getSession} from '../../queries';
import {validateSchema} from '../../utils';
import {schema} from './_schema';

export const auth = new Router();

auth.post('/auth/v1/login', async (ctx: Koa.ParameterizedContext, next) => {
  const query = ctx?.state?.locals?.data;

  // const opts = {
  //   response: query['h-captcha-response'],
  //   secret: __HCAPTCHA_SECRET__,
  // };
  // console.log('opts to POST => ', opts);
  // let resp;
  // try {
  //   resp = await fetch('https://hcaptcha.com/siteverify', {
  //     body: JSON.stringify(opts),
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     method: 'POST',
  //     // mode: 'no-cors',
  //   });
  // } catch(err) {
  //   ctx.throw(400, err);
  // }

  // console.log('hcaptcha response ? ', resp);
  // // console.log(JSON.parse(resp.content))

  return passport.authenticate('local', async (
    err: Error | null,
    account: ts.account) => {
    if (err) ctx.throw(400, err);
    if (!account) ctx.throw(400, 'Account not found');
    await validateSchema<ts.account>(ctx, schema, account);
    await ctx.login(account);

    if (query.isFormSubmit) {
      return ctx.redirect('/admin/meetings');
    }

    const session = await getSession(ctx, account);
    ctx.body = session.data;
  })(ctx, next);
});

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
