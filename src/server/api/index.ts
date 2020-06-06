import Boom from '@hapi/boom';
import Koa from 'koa';

import { accountDownload } from './accountDownload';
import { auth } from './auth';
import { cities } from './cities';
import { city } from './city';
import { country } from './country';
import { geo } from './geo';
import { group } from './group';
import { groups } from './groups';
import { groupsByUserId } from './groupsByUserId';
import { invites } from './invites';
import { meeting } from './meeting';
import { meetings } from './meetings';
import { meetingsByLocation } from './meetingsByLocation';
import { meetingsByUserId } from './meetingsByUserId';
import { region } from './region';
import { reportUri } from './reportUri';
import { roles } from './roles';
import { rsvp } from './rsvp';
import { rsvps } from './rsvps';
import { search } from './search';
import { spaces } from './spaces';
import { tokenSend, tokenValidate } from './token';
import { user } from './user';
import { usersByGroupId } from './usersByGroupId';

export const setupApi = (app: Koa) => {
  app.use(accountDownload.routes());
  app.use(auth.routes());
  app.use(city.routes());
  app.use(cities.routes());
  app.use(country.routes());
  app.use(meeting.routes());
  app.use(meetings.routes());
  app.use(meetingsByLocation.routes());
  app.use(meetingsByUserId.routes());
  app.use(geo.routes());
  app.use(group.routes());
  app.use(groups.routes());
  app.use(groupsByUserId.routes());
  app.use(invites.routes());
  app.use(region.routes());
  app.use(reportUri.routes());
  app.use(roles.routes());
  app.use(rsvp.routes());
  app.use(rsvps.routes());
  app.use(search.routes());
  app.use(spaces.routes());
  app.use(user.routes());
  app.use(usersByGroupId.routes());
  app.use(tokenSend.routes());
  app.use(tokenValidate.routes());

  const opts = Object.freeze({
    methodNotAllowed: () => Boom.methodNotAllowed(),
    notImplemented: () => Boom.notImplemented(),
    throw: true,
  });

  app.use(accountDownload.allowedMethods(opts));
  app.use(auth.allowedMethods(opts));
  app.use(cities.allowedMethods(opts));
  app.use(city.allowedMethods(opts));
  app.use(country.allowedMethods(opts));
  app.use(geo.allowedMethods(opts));
  app.use(group.allowedMethods(opts));
  app.use(group.allowedMethods(opts));
  app.use(groupsByUserId.allowedMethods(opts));
  app.use(invites.allowedMethods(opts));
  app.use(meeting.allowedMethods(opts));
  app.use(meetings.allowedMethods(opts));
  app.use(meetingsByLocation.allowedMethods(opts));
  app.use(meetingsByUserId.allowedMethods(opts));
  app.use(region.allowedMethods(opts));
  app.use(reportUri.allowedMethods(opts));
  app.use(roles.allowedMethods(opts));
  app.use(rsvp.allowedMethods(opts));
  app.use(rsvps.allowedMethods(opts));
  app.use(search.allowedMethods(opts));
  app.use(spaces.allowedMethods(opts));
  app.use(user.allowedMethods(opts));
  app.use(usersByGroupId.allowedMethods(opts));
  app.use(tokenSend.allowedMethods(opts));
  app.use(tokenValidate.allowedMethods(opts));
};
