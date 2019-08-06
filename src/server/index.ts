require('es6-promise').polyfill();
import 'core-js/stable';
import 'isomorphic-fetch';
import 'regenerator-runtime/runtime';

// initialize passport
import './passport';

import http from 'http';
import https from 'https';
import fs from 'fs';
import Koa from 'koa';
import passport from 'koa-passport';
import loglevel from 'loglevel';
import redisStore from 'koa-redis';
import session from 'koa-session';

import { setupMiddleware } from './middleware';
import { setupApi } from './api';
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
  host: '127.0.0.1',
  port: 6379,
});

app.use(session({
  key: 'consensus:sess',
  maxAge: 86400000,
  store,
}, app));

// per request state - good for storing things like nonces, query params, etc
app.context.state = {};
// make it easy to access redis anywhere
app.context.redis = store;

app.use(passport.initialize());
app.use(passport.session());

// setup all middleware in correct order
setupMiddleware(app);

// setup api
setupApi(app);

// render the page
app.use(async ctx => {
  ctx.status = 200; // koa defaults to 404
  ctx.body = SSR(ctx);
});

const HOST = '127.0.0.1';
const HTTP_PORT = 3000;
const HTTPS_PORT = 3001;

// init http server
const httpServer = http.createServer(app.callback());
httpServer.listen(HTTP_PORT, HOST, () => {
  loglevel.info(`HTTP server listening on port ${HTTP_PORT}`);
});

// init https server, use localhost certs in dev, real certs in prod
let key = './static/certs/localhost.key';
let cert = './static/certs/localhost.cert';
if (__PROD__) {
  key = './static/certs/localhost.key';
  cert = './static/certs/localhost.cert';
}

const httpsServer = https.createServer({
  key: fs.readFileSync(key),
  cert: fs.readFileSync(cert),
}, app.callback());

httpsServer.listen(HTTPS_PORT, HOST, () => {
  loglevel.info(`HTTPS server listening on port ${HTTPS_PORT}`);
});
