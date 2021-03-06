require('dotenv-safe').config();
require('es6-promise').polyfill();
import 'core-js/stable';
import 'isomorphic-fetch';
import 'regenerator-runtime/runtime';
import './passport';

import fs from 'fs-extra';
import https from 'https';
import Koa from 'koa';
import passport from 'koa-passport';
import redisStore from 'koa-redis';
import session from 'koa-session';
import loglevel from 'loglevel';
import uuidv4 from 'uuid/v4';

import { setupApi } from './api';
import { setupMiddleware, staticFileMiddleware } from './middleware';
import { SSR } from './SSR';

const app = new Koa();

// "secret" key for sessions, generated at build time
app.keys = [__SECRET__];

const store = redisStore({
  host: 'redis',
  port: 6379,
});

staticFileMiddleware(app);

app.use(session({
  key: 'consensus:sess',
  maxAge: 86400000,
  store,
}, app));

// make it easy to access redis anywhere
app.context.redis = store;
app.context.state = {nonce: uuidv4()};

// session login MUST go before middleware/api
app.use(passport.initialize());
// potential improvement here - pull out api calls that rely on the session
// and put all the others before passport here. to reduce deserialization calls
app.use(passport.session());

// setup all middleware in correct order
setupMiddleware(app);

// setup api
setupApi(app);

// render the page
app.use(async ctx => {
  ctx.status = 200;
  ctx.body = await SSR(app, ctx);
});

const CWD = process.cwd();
let key = `${CWD}/nginx/certs/consensus.local.key`;
let cert = `${CWD}/nginx/certs/consensus.local.crt`;
if (__PROD__) {
  key = `${CWD}/nginx/certs/consensus.local.key`;
  cert = `${CWD}/nginx/certs/consensus.local.crt`;
}

const opts = {
  key: fs.readFileSync(key),
  cert: fs.readFileSync(cert),
};

const httpsServer = https.createServer(opts, app.callback());
/* needs to be 0.0.0.0 for docker */
httpsServer.listen(3001, '0.0.0.0', () => {
  loglevel.info('✅ https app running on port 3001 ✅');
});

httpsServer.on('uncaughtException', (err: Error) => {
  loglevel.error(err.stack);
});

// @TODO add separate LOG_LEVEL env variable to decouple logging from NODE_ENV
if (__DEBUG__) {
  loglevel.setDefaultLevel('trace');
} else if (__DEV__) {
  loglevel.setDefaultLevel('debug');
} else if (__PROD__) {
  loglevel.setDefaultLevel('error');
} else {
  loglevel.setDefaultLevel('info');
}

// run cronjobs
// closeOpenDecisions();
