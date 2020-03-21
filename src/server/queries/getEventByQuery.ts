import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../db/connection';
import {getUsersByIds} from './getUsersByIds';

export const getEventByQuery = async (
  ctx: Koa.ParameterizedContext,
  query: tGetEventQuery,
): Promise<tEvent> => {
  let event: tEvent;
  try {
    event = await knex('events')
      .limit(1)
      .where(query)
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  let rsvps = {} as tRSVP[];
  try {
    rsvps = await knex('users_events')
      .where({
        eventId: event.id,
      });
  } catch (err) {
    return ctx.throw(500, err);
  }

  const account = _.get(ctx, 'state.user', {});

  let rsvp = null;
  if (account.userId) {
    rsvp = _.find(rsvps, (rel: tRSVP) => rel.userId === account.userId);
  }

  // get count of both public and private rsvps
  const publicRSVPS = [...rsvps]
    .filter(rel => rel.type === 'public' && rel.value === 'yes');
  const privateRSVPS = [...rsvps]
    .filter(rel => rel.type === 'private' && rel.value === 'yes');

  // if on an event page, we render a list of public attendees below the description
  const unsafeUsers: tUser[] =
    await getUsersByIds(ctx, publicRSVPS.map(rsvp => rsvp.userId));

  // "unsafe" because we want to check user privacy settings first
  // if this value is set, it should never be a problem. but lets double check anyway
  const attendees = unsafeUsers.filter(user => !user.privateRSVP);

  return {
    ...event,
    attendees,
    publicRSVPS: publicRSVPS.length,
    privateRSVPS: privateRSVPS.length,
    rsvp,
  };
};
