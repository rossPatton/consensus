import Koa from 'koa';
import passport from 'koa-passport';
import { IStrategyOptionsWithRequest, Strategy as LocalStrategy } from 'passport-local';
import speakeasy from 'speakeasy';

import {pg} from './db/connection';

const opts = {
  usernameField: 'email',
  passwordField: 'token',
  passReqToCallback: true,
};

type tDone = (error: any, user?: any, options?: IStrategyOptionsWithRequest) => void;

passport.serializeUser(async (accountWithType: ts.user | ts.group, done) => {
  return done(null, accountWithType);
});

passport.deserializeUser(async (
  obj: {id: number, sessionType: 'user' | 'group'},
  done,
) => {
  let account: ts.user | ts.group;
  if (obj.sessionType === 'user') {
    try {
      account = await pg('users')
        .limit(1)
        .where({id: obj.id})
        .first();
    } catch (err) {
      return done(err, null);
    }
  } else if (obj.sessionType === 'group') {
    try {
      account = await pg('groups')
        .limit(1)
        .where({id: obj.id})
        .first();
    } catch (err) {
      return done(err, null);
    }
  }

  return done(null, account);
});

// we don't use the default username/pw approach
// instead, we verify against email/token
// @ts-ignore fix type here later
passport.use(new LocalStrategy(opts, async (
  req: Koa.Request,

  // @ts-ignore we don't use these, we just access ctx instead
  u: any, p: any,

  done: tDone) => {
  const {query} = req.ctx;
  // set when token is generated
  const {hotpCounter, hotpSecret} = req.ctx.session;

  let account: ts.user | ts.group;
  if (query.sessionType === 'user') {
    try {
      account = await pg('users')
        .limit(1)
        .where({email: query.email})
        .first();
    } catch (err) {
      return done(err, false);
    }
  } else if (query.sessionType === 'group') {
    try {
      account = await pg('groups')
        .limit(1)
        .where({email: query.email})
        .first();
    } catch (err) {
      return done(err, false);
    }
  }

  if (!account) {
    return done({
      message: 'Account not found. Did you enter your email correctly?',
      type: 'email',
    }, false);
  }

  const tokenValidates = speakeasy.hotp.verify({
    counter: hotpCounter,
    secret: hotpSecret,
    encoding: 'base32',
    token: query.token,
  });

  const accountWithType = {
    ...account, sessionType:
    query.sessionType,
  };

  // if passwords match, return the user
  // instead of checking password here, just validate the token instead
  if (tokenValidates) return done(null, accountWithType);

  // default error case - incorrect token
  return done({
    message: 'Token incorrect',
    type: 'token',
  }, false);
}));
