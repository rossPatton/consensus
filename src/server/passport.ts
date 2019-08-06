import bcrypt from 'bcrypt';
import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as OpenIDStrategy } from 'passport-openid';
import { knex } from './db/connection';

const opts = {};

// we use user.id instead of the default of username here to serialize/deserialize
// users should be able to change any of their personal info, including usernames
// their internal id should be the only value that is constant

passport.serializeUser((unsafeUser: tUser, done: any) => {
  const { password, ...user } = unsafeUser;
  return done(null, user);
});

type tDone = (err: Error | null, data: any) => void;
passport.deserializeUser(async (savedUser: tUser, done: tDone) => {
  try {
    const { id } = savedUser;
    const user = await knex('users').where({ id }).first();
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
});


const isValidPw = async (userPassword: string, databasePassword: string) =>
  bcrypt.compare(userPassword, databasePassword);

passport.use(new LocalStrategy(opts, async (username, pw, done) => {
  let user: any = {};
  try {
    user = await knex('users').where({ username }).first();
  } catch (err) {
    return done(err, false);
  }

  // if passwords match, return the user
  if (await isValidPw(pw, user.password)) return done(null, user);

  // default case - incorrect password
  return done({
    message: 'Passwords didnt match',
    type: 'password',
  }, false);
}));


// type tDone = (err: Error | null, user: tUser) => Promise<any>;
// passport.use(new OpenIDStrategy({
//   returnURL: 'https://127.0.0.1:3001/admin',
//   realm: 'https://127.0.0.1:3001/',
// }, (identifier: any, done: tDone) => {
//   User.findByOpenID({ openId: identifier }, (err: Error | null, user: tUser) => {
//     return done(err, user);
//   });
// }));
