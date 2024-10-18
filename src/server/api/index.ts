import Boom from '@hapi/boom';
// import fs from 'fs';
// import geolite2, { GeoIpDbName } from 'geolite2-redist';
import Koa from 'koa';
// import maxmind, {
// CountryResponse,
// Reader, 
// } from 'maxmind';

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
import { sendEmail } from './sendEmail';
import { spaces } from './spaces';
import { tokenSend, tokenValidate } from './token';
import { user } from './user';
import { users } from './users';
import { usersByGroupId } from './usersByGroupId';

// const buffer = fs.readFileSync(geolite2.paths.city);
// export const lookup = new Reader<CityResponse>(buffer);
// export let lookup = {};
// import('geolite2-redist').then((geolite2) => {
//   return geolite2.open(
//     GeoIpDbName.Country,                 // database name
//     async (dbPath) => maxmind.open(dbPath) // function that builds a useful db reader
//   )
// }).then(async (reader) => {
//   lookup = reader;
// lookup = await geolite2.open(
//   GeoIpDbName.Country, // Use the enum instead of a string!
//   (path: string) => maxmind.open<CountryResponse>(path)
// );
// });

// export const lookup = (async () => {
//   return await geolite2.open(
//     GeoIpDbName.Country, // Use the enum instead of a string!
//     (path: string) => maxmind.open<CountryResponse>(path)
//   );
// })();

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
  app.use(sendEmail.routes());
  app.use(spaces.routes());
  app.use(user.routes());
  app.use(users.routes());
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
  app.use(sendEmail.allowedMethods(opts));
  app.use(spaces.allowedMethods(opts));
  app.use(user.allowedMethods(opts));
  app.use(users.allowedMethods(opts));
  app.use(usersByGroupId.allowedMethods(opts));
  app.use(tokenSend.allowedMethods(opts));
  app.use(tokenValidate.allowedMethods(opts));
};
