import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';

import {knex} from './db/connection';
import {isValidPw} from './utils';

const opts = {};

passport.serializeUser(async (account: ts.account, done) => {
  return done(null, account);
});

passport.deserializeUser(async (account: ts.account, done) => {
  try {
    const row: ts.account = await knex('accounts')
      .limit(1)
      .where({id: account.id})
      .first();
    return done(null, row);
  } catch (err) {
    return done(err, null);
  }
});

// due to stupid passportjs limitations, the login value here has to be set as
// 'username' in the login form. but it cooresponds to the login value in accounts
passport.use(new LocalStrategy(opts, async (login, pw, done) => {
  let account: ts.account;
  try {
    account = await knex('accounts')
      .limit(1)
      .where({login})
      .first();
  } catch (err) {
    return done(err, false);
  }

  if (!account) {
    return done({
      message: 'Incorrect login',
      type: 'login',
    }, false);
  }

  // if passwords match, return the user
  if (await isValidPw(pw, account.password)) return done(null, account);

  // default error case - incorrect password
  return done({
    message: 'Passwords dont match',
    type: 'password',
  }, false);
}));
