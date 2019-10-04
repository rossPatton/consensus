import {notNull} from '../../utils/notNull';

// this is a server util, because we want to make sure that events get filtered
// before returning them to the client

// this is because depending on user/group permissions, or login state, we might
// want to hide certain events and/or drafts

export const filterEvs4Client = async (
  events: tEvent[],
  isAuthenticated: boolean,
  role: tRole,
): Promise<tEvent[]> => {
  return events.map(ev => {
    if (ev.isPrivate || ev.isDraft) {
    // if private event or draft, and user is not logged in, hide
      if (!isAuthenticated) return null;
      // if private event or draft, user is logged in, but user is not a member, hide
      if (role === null) return null;
      // only facilitators and the org admin should see drafts
      if (ev.isDraft && role === 'member') return null;
    }

    return ev;
  }).filter(notNull);
};
