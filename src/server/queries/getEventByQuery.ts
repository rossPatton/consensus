import Koa from 'koa';

import { knex } from '../db/connection';
import { getRSVPByEventId } from './getRSVPByEventId';

// TODO add sanitization/validation
export const getEventByQuery = async (
  ctx: Koa.ParameterizedContext,
  query: any): Promise<tEvent> => {

  let event: tEvent;
  try {
    event = await knex('events')
      .limit(1)
      .where(query)
      .first();
  } catch (err) {
    return ctx.throw(400, err);
  }

  const {rsvp} = await getRSVPByEventId(ctx, event.id);

  return {
    ...event,
    rsvp,
  };
};
