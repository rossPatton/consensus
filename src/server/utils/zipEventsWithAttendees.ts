import _ from 'lodash';

// takes events, and user rsvps, and zips them together
export const zipEventsWithAttendees = async (events: tEvent[], rels: any[]) => {
  return await Promise.all(
    events.map(async ev => {
      const publicRSVPS = [...rels].filter(
        rel => rel.eventId === ev.id && rel.publicRSVP,
      ).length;
      const privateRSVPS = [...rels].filter(
        rel => rel.eventId === ev.id && rel.privateRSVP,
      ).length;

      return {
        ...ev,
        publicRSVPS,
        privateRSVPS,
      };
    }),
  );
};
