import _ from 'lodash';

// takes meetings, and user rsvps, and zips them together
export const zipEventsWithAttendees = async (meetings: tMeeting[], rels: tRSVP[]) => {
  return Promise.all(
    meetings.map(async ev => {
      const publicRSVPS = [...rels].filter(
        rel => rel.meetingId === ev.id && rel.type === 'public',
      ).length;
      const privateRSVPS = [...rels].filter(
        rel => rel.meetingId === ev.id && rel.type === 'private',
      ).length;

      return {
        ...ev,
        publicRSVPS,
        privateRSVPS,
      };
    }),
  );
};
