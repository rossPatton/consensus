import Koa from 'koa';
import _ from 'lodash';

import {getRSVPsByUserId} from '../queries';

// if account is logged in, and is a user (as opposed to an admin), fetch rsvps too
export const zipEvsWithRSVPS = async (ctx: Koa.ParameterizedContext, events: tEvent[]) => {
  const account = _.get(ctx, 'state.user', null);
  if (!account || !account.userId) return events;

  // if user account, fetch rsvps
  const userEventsRels = await getRSVPsByUserId(ctx, account.userId);

  return events.map(ev => {
    const rsvpObj = _.find(
      userEventsRels,
      rel => rel.eventId === ev.id && rel.userId === account.userId,
    );

    const rsvp = (rsvpObj && rsvpObj.rsvp) || false;

    return {
      ...ev,
      rsvp,
    };
  });
};
