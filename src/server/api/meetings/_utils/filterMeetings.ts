import Koa from 'koa';

import {notNull} from '~app/utils';

/**
 * @description we want to make sure that meetings get filtered before returning them to the client, depending on membership or login status
 */
export const filterMeetings = async (
  ctx: Koa.ParameterizedContext,
  meetings: ts.meeting[],
  role: ts.role,
): Promise<ts.meeting[]> => {
  const isAuthenticated = ctx.isAuthenticated();

  return Promise.all(
    meetings.map(ev => {
      if (ev.isDraft) {
        // if draft, and user is not logged in, hide
        if (!isAuthenticated) return null;
        // user is logged in, but user is not a member, hide
        if (role === null) return null;
        // only facilitators and the org admin should see drafts
        if (ev.isDraft && role === 'member') return null;
      }

      return ev;
    })
      .filter(notNull),
  );
};
