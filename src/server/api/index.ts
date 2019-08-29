import Koa from 'koa';

import { auth } from './auth';
import { city } from './city';
import { country } from './country';
import { decisionsByOrg } from './decisionsByOrg';
import { event } from './event';
import { eventsByOrg } from './eventsByOrg';
import { fileUpload } from './fileUpload';
import { org } from './org';
import { region } from './region';
import { reportUri } from './reportUri';
import { rsvp } from './rsvp';
import { user } from './user';
import { users } from './users';
import { usersByOrg } from './usersByOrg';

export const setupApi = (app: Koa) => {
  // app stuff, queries, etc
  app.use(auth.routes());
  app.use(city.routes());
  app.use(country.routes());
  app.use(decisionsByOrg.routes());
  app.use(event.routes());
  app.use(eventsByOrg.routes());
  app.use(fileUpload.routes());
  app.use(org.routes());
  app.use(region.routes());
  app.use(reportUri.routes());
  app.use(rsvp.routes());
  app.use(user.routes());
  app.use(users.routes());
  app.use(usersByOrg.routes());

  app.use(auth.allowedMethods());
  app.use(city.allowedMethods());
  app.use(country.allowedMethods());
  app.use(decisionsByOrg.allowedMethods());
  app.use(event.allowedMethods());
  app.use(eventsByOrg.allowedMethods());
  app.use(fileUpload.allowedMethods());
  app.use(org.allowedMethods());
  app.use(region.allowedMethods());
  app.use(reportUri.allowedMethods());
  app.use(rsvp.allowedMethods());
  app.use(user.allowedMethods());
  app.use(users.allowedMethods());
  app.use(usersByOrg.allowedMethods());
};
