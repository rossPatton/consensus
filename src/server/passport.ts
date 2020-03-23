import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';

import {knex} from './db/connection';
import {isValidPw} from './utils';

const opts = {};

passport.serializeUser(async (account: tAccount, done) => {
  return done(null, account);
});

passport.deserializeUser(async (account: tAccount, done) => {
  try {
    const row: tAccount = await knex('accounts')
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
  let account: tAccount;
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
      message: 'No account found that matches your login',
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
