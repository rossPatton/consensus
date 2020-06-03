import Koa from 'koa';
import passport from 'koa-passport';
import { IStrategyOptionsWithRequest, Strategy as LocalStrategy } from 'passport-local';
import speakeasy from 'speakeasy';

import {knex} from './db/connection';

const opts = {
  usernameField: 'email',
  passwordField: 'token',
  passReqToCallback: true,
};

type tDone = (error: any, user?: any, options?: IStrategyOptionsWithRequest) => void;

passport.serializeUser(async (accountWithType: ts.account, done) => {
  return done(null, accountWithType);
});

passport.deserializeUser(async (accountWithType: ts.account, done) => {
  console.log('deserialize accountWithType => ', accountWithType);
  return done(null, accountWithType);
  // if (accountWithType.type === 'user') {
  //   try {
  //     const user: ts.user = await knex('users')
  //       .limit(1)
  //       .where({id: accountWithType.id})
  //       .first();
  //     return done(null, user);
  //   } catch (err) {
  //     return done(err, null);
  //   }
  // } else if (accountWithType.type === 'group') {
  //   try {
  //     const group: ts.group = await knex('groups')
  //       .limit(1)
  //       .where({id: accountWithType.id})
  //       .first();
  //     return done(null, group);
  //   } catch (err) {
  //     return done(err, null);
  //   }
  // }
});

// we don't use the default username/pw approach
// instead, we verify against email/token
// @ts-ignore fix type here later
passport.use(new LocalStrategy(opts, async (
  req: Koa.Request,
  // @ts-ignore
  u: any, p: any,
  done: tDone) => {
  const {query} = req.ctx;
  console.log('passport query => ', query);
  // set when user initiates login or signup
  const {hotpCounter, hotpSecret} = req.ctx.session;

  let account: ts.account;
  if (query.type === 'user') {
    try {
      account = await knex('users')
        .limit(1)
        .where({email: query.email})
        .first();
    } catch (err) {
      return done(err, false);
    }
  } else if (query.type === 'group') {
    console.log('searching for group account by => ', query.email)
    try {
      account = await knex('groups')
        .limit(1)
        .where({email: query.email})
        .first();
    } catch (err) {
      return done(err, false);
    }
  }

  console.log('account => ', account);

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

  const accountWithType = {...account, type: query.type};

  // if passwords match, return the user
  // instead of checking password here, just validate the token instead
  if (tokenValidates) return done(null, accountWithType);

  // default error case - incorrect token
  return done({
    message: 'Token incorrect',
    type: 'token',
  }, false);
}));
