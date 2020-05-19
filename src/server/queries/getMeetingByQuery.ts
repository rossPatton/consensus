import Koa from 'koa';
import _ from 'lodash';

import {knex} from '../db/connection';
import {getUsersByIds} from './getUsersByIds';

export const getMeetingByQuery = async (
  ctx: Koa.ParameterizedContext,
  query: ts.getMeetingQuery,
): Promise<ts.meetingSingular> => {
  let meeting: ts.meetingSingular;
  try {
    meeting = await knex('meetings')
      .limit(1)
      .where(query)
      .first();
  } catch (err) {
    return ctx.throw(500, err);
  }

  let attendeeData = {};

  if (!meeting.isDraft) {
    const account = ctx?.state?.user || {};

    let rsvps = {} as ts.rsvp[];
    try {
      rsvps = await knex('users_meetings')
        .where({
          meetingId: meeting.id,
        });
    } catch (err) {
      return ctx.throw(500, err);
    }

    let rsvp = null;
    if (account.userId) {
      rsvp = _.find(rsvps, (rel: ts.rsvp) => rel.userId === account.userId);
    }

    // get count of both public and private rsvps
    const publicRSVPS = [...rsvps]
      .filter(rel => rel.type === 'public' && rel.value === 'yes');
    const privateRSVPS = [...rsvps]
      .filter(rel => rel.type === 'private' && rel.value === 'yes');

    // if on an meeting page, we render a list of public attendees below the description
    const unsafeUsers: ts.user[] =
      await getUsersByIds(ctx, publicRSVPS.map(rsvp => rsvp.userId));

    // "unsafe" because we want to check user privacy settings first
    // if this value is set, it should never be a problem. but lets double check anyway
    const attendees = unsafeUsers.filter(user => !user.privateRSVP);

    attendeeData = {
      attendees,
      publicRSVPS: publicRSVPS.length,
      privateRSVPS: privateRSVPS.length,
      rsvp,
    };
  }

  return {
    ...meeting,
    ...attendeeData,
  };
};
