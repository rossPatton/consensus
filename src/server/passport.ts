import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { knex } from './db/connection';
import { isValidPw } from './utils';

const opts = {};

// we use user.id instead of the default of username here to serialize/deserialize
// users should be able to change any of their personal info, including usernames
// their internal id should be the only value that is constant

passport.serializeUser((unsafeUser: tUser, done) => {
  const {password, ...user} = unsafeUser;
  return done(null, user);
});

passport.deserializeUser(async (savedUser: tUser, done) => {
  try {
    const {id} = savedUser;
    const user: tUser = await knex('users').limit(1).where({id}).first();
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
});

passport.use(new LocalStrategy(opts, async (email, pw, done) => {
  console.log('arguments for passport => ', email, pw);
  // let user: tUser;
  // try {
  //   user = await knex('users').limit(1).where({email}).first();
  // } catch (err) {
  //   return done(err, false);
  // }

  // // if passwords match, return the user
  // if (await isValidPw(pw, user.password)) return done(null, user);

  // // default error case - incorrect password
  // return done({
  //   message: 'Passwords dont match',
  //   type: 'password',
  // }, false);
}));
