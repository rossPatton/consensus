import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { knex } from './db/connection';
import { isValidPw } from './utils';

const opts = {};

// we use user.id instead of the default of username here to serialize/deserialize
// users should be able to change any of their personal info, including usernames
// their internal id should be the only value that is constant

passport.serializeUser(async (account: any, done) => {
  // const {orgId, userId} = account;
  // // TODO get actual account profile here

  // let profile: any;
  // if (orgId) {
  //   try {
  //     profile = await knex('orgs').limit(1).where({id: orgId}).first();
  //   } catch (err) {
  //     return done(err, false);
  //   }
  // } else if (userId) {
  //   try {
  //     profile = await knex('users').limit(1).where({id: userId}).first();
  //   } catch (err) {
  //     return done(err, false);
  //   }
  // }

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
  console.log('arguments for passport => ', login, pw);
  let account: any;
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
