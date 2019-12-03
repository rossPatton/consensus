import Boom from '@hapi/boom';
import Koa from 'koa';

import { account } from './account';
import { auth } from './auth';
import { city } from './city';
import { country } from './country';
import { decision } from './decision';
import { decisions } from './decisions';
import { event } from './event';
import { events } from './events';
import { eventsByUser } from './eventsByUser';
import { fileUpload } from './fileUpload';
import { org } from './org';
import { orgById } from './orgById';
import { orgsBySession } from './orgsBySession';
import { orgsByUser } from './orgsByUser';
import { region } from './region';
import { reportUri } from './reportUri';
import { roles } from './roles';
import { rsvp } from './rsvp';
import { rsvps } from './rsvps';
import { user } from './user';
import { userDecisions } from './userDecisions';
import { users } from './users';
import { usersByOrg } from './usersByOrg';

export const setupApi = (app: Koa) => {
  app.use(account.routes());
  app.use(auth.routes());
  app.use(city.routes());
  app.use(country.routes());
  app.use(decision.routes());
  app.use(decisions.routes());
  app.use(event.routes());
  app.use(events.routes());
  app.use(eventsByUser.routes());
  app.use(fileUpload.routes());
  app.use(org.routes());
  app.use(orgById.routes());
  app.use(orgsBySession.routes());
  app.use(orgsByUser.routes());
  app.use(region.routes());
  app.use(reportUri.routes());
  app.use(roles.routes());
  app.use(rsvp.routes());
  app.use(rsvps.routes());
  app.use(user.routes());
  app.use(users.routes());
  app.use(usersByOrg.routes());
  app.use(userDecisions.routes());

  const opts = Object.freeze({
    methodNotAllowed: () => Boom.methodNotAllowed(),
    notImplemented: () => Boom.notImplemented(),
    throw: true,
  });

  app.use(account.allowedMethods(opts));
  app.use(auth.allowedMethods(opts));
  app.use(city.allowedMethods(opts));
  app.use(country.allowedMethods(opts));
  app.use(decision.allowedMethods(opts));
  app.use(decisions.allowedMethods(opts));
  app.use(event.allowedMethods(opts));
  app.use(events.allowedMethods(opts));
  app.use(eventsByUser.allowedMethods(opts));
  app.use(fileUpload.allowedMethods(opts));
  app.use(org.allowedMethods(opts));
  app.use(orgById.allowedMethods(opts));
  app.use(orgsBySession.allowedMethods(opts));
  app.use(orgsByUser.allowedMethods(opts));
  app.use(region.allowedMethods(opts));
  app.use(reportUri.allowedMethods(opts));
  app.use(roles.allowedMethods(opts));
  app.use(rsvp.allowedMethods(opts));
  app.use(rsvps.allowedMethods(opts));
  app.use(user.allowedMethods(opts));
  app.use(users.allowedMethods(opts));
  app.use(usersByOrg.allowedMethods(opts));
  app.use(userDecisions.allowedMethods(opts));
};
