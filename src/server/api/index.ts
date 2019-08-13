import Koa from 'koa';
// import multer from 'koa-multer';

import { auth } from './auth';
import { decisionsByOrg } from './decisionsByOrg';
import { event } from './event';
import { eventsByOrg } from './eventsByOrg';
import { org } from './org';
import { reportUri } from './reportUri';
import { user } from './user';
import { users } from './users';
import { usersByOrg } from './usersByOrg';

import { fileUpload } from './fileUpload';

export const setupApi = (app: Koa) => {
  // app.use(multer());

  // app stuff, queries, etc
  app.use(auth.routes());
  app.use(decisionsByOrg.routes());
  app.use(event.routes());
  app.use(eventsByOrg.routes());
  app.use(fileUpload.routes());
  app.use(org.routes());
  app.use(reportUri.routes());
  app.use(user.routes());
  app.use(users.routes());
  app.use(usersByOrg.routes());

  app.use(auth.allowedMethods());
  app.use(decisionsByOrg.allowedMethods());
  app.use(event.allowedMethods());
  app.use(eventsByOrg.allowedMethods());
  app.use(fileUpload.allowedMethods());
  app.use(org.allowedMethods());
  app.use(reportUri.allowedMethods());
  app.use(user.allowedMethods());
  app.use(users.allowedMethods());
  app.use(usersByOrg.allowedMethods());
};
