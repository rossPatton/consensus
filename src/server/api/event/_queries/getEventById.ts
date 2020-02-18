import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../../../db/connection';
import {getAccountRoleRelByOrgId, getOrgById, getUsersByIds} from '../../../queries';

export const getEventById = async (
  ctx: Koa.ParameterizedContext,
  query: tIdQuery,
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

  if (!event) {
    ctx.status = 204;
    return {} as tEvent;
  }

  // user role for this particular org
  const {role} = await getAccountRoleRelByOrgId(ctx, event.orgId);
  const org = await getOrgById(ctx, event.orgId);

  if (!role && org.type !== 'public') {
    ctx.status = 204;
    return {} as tEvent;
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

  // get count for both public and private rsvps
  const publicRSVPS = [...rsvps].filter(rel => rel.publicRSVP);
  const privateRSVPS = [...rsvps].filter(rel => rel.privateRSVP);

  // get all event attendees first
  const unsafeUsers = await getUsersByIds(ctx, publicRSVPS.map(rsvp => rsvp.userId));

  // then filter out all the ones that are private
  // if users are okay with sharing RSVPs, we render a list of event attendees
  const attendees = unsafeUsers.filter(user => !user.privateRSVP);

  return {
    ...event,
    attendees,
    publicRSVPS: publicRSVPS.length,
    privateRSVPS: privateRSVPS.length,
  };
};
