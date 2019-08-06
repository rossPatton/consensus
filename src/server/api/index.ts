import Koa from 'koa';

import { auth } from './auth';
import { decisionsByOrg } from './decisionsByOrg';
import { eventsByOrg } from './eventsByOrg';
import { org } from './org';
import { reportUri } from './reportUri';
import { user } from './user';
import { users } from './users';
import { usersByOrg } from './usersByOrg';

export const setupApi = (app: Koa) => {
  // app stuff, queries, etc
  app.use(auth.routes());
  app.use(decisionsByOrg.routes());
  app.use(eventsByOrg.routes());
  app.use(org.routes());
  app.use(reportUri.routes());
  app.use(user.routes());
  app.use(users.routes());
  app.use(usersByOrg.routes());

  app.use(auth.allowedMethods());
  app.use(decisionsByOrg.allowedMethods());
  app.use(eventsByOrg.allowedMethods());
  app.use(org.allowedMethods());
  app.use(reportUri.allowedMethods());
  app.use(user.allowedMethods());
  app.use(users.allowedMethods());
  app.use(usersByOrg.allowedMethods());
};
