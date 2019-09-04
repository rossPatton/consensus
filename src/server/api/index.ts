import Koa from 'koa';

import { auth } from './auth';
import { city } from './city';
import { country } from './country';
import { decisions } from './decisions';
import { event } from './event';
import { events } from './events';
import { eventsByUser } from './eventsByUser';
import { fileUpload } from './fileUpload';
import { org } from './org';
import { orgsByUser } from './orgsByUser';
import { region } from './region';
import { reportUri } from './reportUri';
import { role } from './role';
import { rsvp } from './rsvp';
import { rsvps } from './rsvps';
import { user } from './user';
import { users } from './users';
import { usersByOrg } from './usersByOrg';

export const setupApi = (app: Koa) => {
  app.use(auth.routes());
  app.use(city.routes());
  app.use(country.routes());
  app.use(decisions.routes());
  app.use(event.routes());
  app.use(events.routes());
  app.use(eventsByUser.routes());
  app.use(fileUpload.routes());
  app.use(org.routes());
  app.use(orgsByUser.routes());
  app.use(region.routes());
  app.use(reportUri.routes());
  app.use(role.routes());
  app.use(rsvp.routes());
  app.use(rsvps.routes());
  app.use(user.routes());
  app.use(users.routes());
  app.use(usersByOrg.routes());

  app.use(auth.allowedMethods());
  app.use(city.allowedMethods());
  app.use(country.allowedMethods());
  app.use(decisions.allowedMethods());
  app.use(event.allowedMethods());
  app.use(events.allowedMethods());
  app.use(eventsByUser.allowedMethods());
  app.use(fileUpload.allowedMethods());
  app.use(org.allowedMethods());
  app.use(orgsByUser.allowedMethods());
  app.use(region.allowedMethods());
  app.use(reportUri.allowedMethods());
  app.use(role.allowedMethods());
  app.use(rsvp.allowedMethods());
  app.use(rsvps.allowedMethods());
  app.use(user.allowedMethods());
  app.use(users.allowedMethods());
  app.use(usersByOrg.allowedMethods());
};
