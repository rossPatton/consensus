import Boom from '@hapi/boom';
import Koa from 'koa';

import { account } from './account';
import { auth } from './auth';
import { city } from './city';
import { country } from './country';
import { event } from './event';
import { events } from './events';
import { eventsByUserId } from './eventsByUserId';
import { geo } from './geo';
import { org } from './org';
import { orgs } from './orgs';
import { orgsByUserId } from './orgsByUserId';
import { region } from './region';
import { reportUri } from './reportUri';
import { roles } from './roles';
import { rsvp } from './rsvp';
import { rsvps } from './rsvps';
import { search } from './search';
import { user } from './user';
import { usersByOrgId } from './usersByOrgId';

export const setupApi = (app: Koa) => {
  app.use(account.routes());
  app.use(auth.routes());
  app.use(city.routes());
  app.use(country.routes());
  app.use(event.routes());
  app.use(events.routes());
  app.use(eventsByUserId.routes());
  app.use(geo.routes());
  app.use(org.middleware());
  app.use(org.routes());
  app.use(orgs.routes());
  app.use(orgsByUserId.routes());
  app.use(region.routes());
  app.use(reportUri.routes());
  app.use(roles.routes());
  app.use(rsvp.routes());
  app.use(rsvps.routes());
  app.use(search.routes());
  app.use(user.routes());
  app.use(usersByOrgId.routes());

  const opts = Object.freeze({
    methodNotAllowed: () => Boom.methodNotAllowed(),
    notImplemented: () => Boom.notImplemented(),
    throw: true,
  });

  app.use(account.allowedMethods(opts));
  app.use(auth.allowedMethods(opts));
  app.use(city.allowedMethods(opts));
  app.use(country.allowedMethods(opts));
  app.use(event.allowedMethods(opts));
  app.use(events.allowedMethods(opts));
  app.use(eventsByUserId.allowedMethods(opts));
  app.use(geo.allowedMethods(opts));
  app.use(org.allowedMethods(opts));
  app.use(orgs.allowedMethods(opts));
  app.use(orgsByUserId.allowedMethods(opts));
  app.use(region.allowedMethods(opts));
  app.use(reportUri.allowedMethods(opts));
  app.use(roles.allowedMethods(opts));
  app.use(rsvp.allowedMethods(opts));
  app.use(rsvps.allowedMethods(opts));
  app.use(search.allowedMethods(opts));
  app.use(user.allowedMethods(opts));
  app.use(usersByOrgId.allowedMethods(opts));
};
