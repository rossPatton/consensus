import Koa from 'koa';

import {notNull} from '../../../../utils/nulls';

// this is a server util, because we want to make sure that meetings get filtered
// before returning them to the client

// this is because depending on user/group permissions, or login state, we might
// want to hide certain meetings and/or drafts

export const filterEvents = async (
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
