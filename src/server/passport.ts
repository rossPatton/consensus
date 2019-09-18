import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { knex } from './db/connection';
import { isValidPw } from './utils';

const opts = {};

passport.serializeUser(async (account: any, done) => {
  return done(null, account.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const account: any = await knex('accounts').limit(1).where({id}).first();
    return done(null, account);
  } catch (err) {
    return done(err, null);
  }
});

passport.use(new LocalStrategy(opts, async (login, pw, done) => {
  let account: tAccount;
  try {
    account = await knex('accounts').limit(1).where({login}).first();
  } catch (err) {
    return done(err, false);
  }

  // if passwords match, return the user
  if (await isValidPw(pw, account.password)) return done(null, account);

  // default error case - incorrect password
  return done({
    message: 'Passwords dont match',
    type: 'password',
  }, false);
}));
