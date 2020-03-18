import _ from 'lodash';

// takes events, and user rsvps, and zips them together
export const zipEventsWithAttendees = async (events: tEvent[], rels: tRSVP[]) => {
  return Promise.all(
    events.map(async ev => {
      const publicRSVPS = [...rels].filter(
        rel => rel.eventId === ev.id && rel.type === 'public',
      ).length;
      const privateRSVPS = [...rels].filter(
        rel => rel.eventId === ev.id && rel.type === 'private',
      ).length;

      return {
        ...ev,
        publicRSVPS,
        privateRSVPS,
      };
    }),
  );
};
