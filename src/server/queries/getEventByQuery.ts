import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../db/connection';

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

  let attendees = {} as tRSVP[];
  try {
    attendees = await knex('users_events')
      .where({
        eventId: event.id,
        publicRSVP: true,
      })
      .orWhere({
        eventId: event.id,
        privateRSVP: true,
      });
  } catch (err) {
    return ctx.throw(400, err);
  }

  const account = _.get(ctx, 'state.user', {});
  let rsvp = false;
  if (account.userId) {
    const rel = _.find(attendees, (rel: tRSVP) => rel.userId === account.userId);
    if (rel) {
      rsvp = rel.publicRSVP || rel.privateRSVP;
    }
  }

  return {
    ...event,
    attendees: attendees.length,
    rsvp,
  };
};
