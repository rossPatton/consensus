import _ from 'lodash';

// takes meetings, and user rsvps, and zips them together
export const zipMeetingsWithAttendees = async (meetings: ts.meeting[], rels: ts.rsvp[]) => {
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
