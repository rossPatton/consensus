import Koa from 'koa';
import _ from 'lodash';

import {eventKeys} from '../../_constants';
import {knex} from '../../../db/connection';
import {getAccountRoleRelByOrgId, getGroupById, getUsersByIds} from '../../../queries';

export const getEvent = async (
  ctx: Koa.ParameterizedContext,
  query: tGetEventQuery,
): Promise<tEvent> => {
  let event: tEvent;
  try {
    event = await knex('events')
      .limit(1)
      .where(query)
      .first()
      .returning(eventKeys);
  } catch (err) {
    return ctx.throw(500, err);
  }

  // lookup failed, for example, user entered id for event that doesnt exist
  if (typeof event === 'undefined' || _.isEmpty(event)) {
    ctx.status = 204;
    return {} as tEvent;
  }

  // user role for this particular org
  const {role} = await getAccountRoleRelByOrgId(ctx, event.orgId);
  const org = await getGroupById(ctx, event.orgId);

  if (!role && org.type !== 'public') {
    ctx.redirect('/401');
    return ctx.throw(401);
  }

  let rsvps = [] as tRSVP[];
  try {
    rsvps = await knex('users_events')
      .where({
        eventId: event.id,
      });
  } catch (err) {
    return ctx.throw(500, err);
  }

  // get count for both public and private rsvps
  const publicRSVPS = [...rsvps]
    .filter(rel => rel.type === 'public' && rel.value === 'yes');
  const privateRSVPS = [...rsvps]
    .filter(rel => rel.type === 'private' && rel.value === 'yes');

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
