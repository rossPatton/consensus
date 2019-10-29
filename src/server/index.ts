require('dotenv').config();
require('es6-promise').polyfill();
import 'core-js/stable';
import 'isomorphic-fetch';
import 'regenerator-runtime/runtime';
// initialize passport
import './passport';

import fs from 'fs-extra';
import http from 'http';
import https from 'https';
import Koa from 'koa';
import passport from 'koa-passport';
import redisStore from 'koa-redis';
import session from 'koa-session';
import loglevel from 'loglevel';
import uuidv4 from 'uuid/v4';

import { setupApi } from './api';
import { setupMiddleware } from './middleware';
import { SSR } from './SSR';

if (__DEBUG__) {
  loglevel.setDefaultLevel('trace');
} else if (__DEV__) {
  loglevel.setDefaultLevel('debug');
} else if (__PROD__) {
  loglevel.setDefaultLevel('error');
} else {
  loglevel.setDefaultLevel('info');
}

const app = new Koa();

// "secret" key for sessions, generated at build time
app.keys = [__SECRET__];

const store = redisStore({
  host: __REDIS__,
  port: 6379,
});

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
app.use(passport.session());

// setup all middleware in correct order
setupMiddleware(app);

// setup api
setupApi(app);

// render the page
app.use(async ctx => {
  ctx.status = 200; // TODO gotta be a better way to do this
  ctx.body = SSR(app, ctx);
});

// to run localhost via Docker, you must update your docker config locally
const HOST = __DEV__ ? '127.0.0.1' : '0.0.0.0';
const HTTP_PORT = 3000;
const HTTPS_PORT = 3001;

// init https server, use localhost certs in dev, real certs in prod
let key = './static/certs/localhost.key';
let cert = './static/certs/localhost.cert';
if (__PROD__) {
  key = './static/certs/localhost.key';
  cert = './static/certs/localhost.cert';
}

const opts = {
  key: fs.readFileSync(key),
  cert: fs.readFileSync(cert),
};

// init http server
const httpServer = http.createServer(app.callback());
const httpsServer = https.createServer(opts, app.callback());

httpServer.listen(HTTP_PORT, HOST, () => {
  // eslint-disable-next-line
  console.log(`HTTP server listening on port ${HTTP_PORT}`);
});
httpsServer.listen(HTTPS_PORT, HOST, () => {
  // eslint-disable-next-line
  console.log(`HTTPS server listening on port ${HTTPS_PORT}`);
});
