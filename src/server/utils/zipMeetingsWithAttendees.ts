import Koa from 'koa';
import _ from 'lodash';

import {getUsersByIds} from '../queries';

// takes meetings, and user rsvps, and zips them together
export const zipMeetingsWithAttendees = async (
  ctx: Koa.ParameterizedContext,
  meetings: ts.meeting[],
  rels: ts.rsvp[]) => {
  return Promise.all(
    meetings.map(async meeting => {
      const publicRSVPS = [...rels].filter(
        rel => rel.meetingId === meeting.id && rel.type === 'public',
      );
      const privateRSVPS = [...rels].filter(
        rel => rel.meetingId === meeting.id && rel.type === 'private',
      );

      // if on an meeting page, we render a list of public attendees below the description
      const publicUsers: ts.user[] = await getUsersByIds(ctx, publicRSVPS.map(rsvp => rsvp.userId));

      return {
        ...meeting,
        attendees: publicRSVPS.length + privateRSVPS.length,
        publicRSVPS: publicUsers,
      };
    }),
  );
};
