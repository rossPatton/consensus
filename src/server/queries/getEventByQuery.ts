import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../db/connection';
import {getUsersByIds} from './getUsersByIds';

// TODO add sanitization/validation
export const getEventByQuery = async (
  ctx: Koa.ParameterizedContext,
  query: any,
): Promise<tEvent> => {
  let event: tEvent;
  try {
    event = await knex('events')
      .limit(1)
      .where(query)
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  let rsvps = {} as tRSVP[];
  try {
    rsvps = await knex('users_events')
      .where({
        eventId: event.id,
      });
  } catch (err) {
    return ctx.throw(400, err);
  }

  const account = _.get(ctx, 'state.user', {});
  let rsvp = false;
  if (account.userId) {
    const rel = _.find(rsvps, (rel: tRSVP) => rel.userId === account.userId);
    if (rel) {
      rsvp = rel.publicRSVP || rel.privateRSVP;
    }
  }

  console.log('rsvps => ', rsvps);

  // get count of both public and private rsvps (we combine these on the client, sometimes)
  const publicRSVPS = [...rsvps].filter(rel => rel.publicRSVP);
  const privateRSVPS = [...rsvps].filter(rel => rel.privateRSVP);

  console.log('public then private counts => ', publicRSVPS.length, privateRSVPS.length);

  // if on an actual event page, we render a list of public attendees below the description
  const unsafeUsers = await getUsersByIds(ctx, publicRSVPS.map(rsvp => rsvp.userId));
  console.log('unsafeUsers => ', unsafeUsers);

  // "unsafe" because we want to check their privacy settings before we return anything
  // if this value is set, it should never be a problem. but lets double check anyway
  const attendees = unsafeUsers.filter(user => !user.privateRSVP);

  console.log('attendees => ', attendees);

  return {
    ...event,
    attendees,
    publicRSVPS: publicRSVPS.length,
    privateRSVPS: privateRSVPS.length,
    rsvp,
  };
};
