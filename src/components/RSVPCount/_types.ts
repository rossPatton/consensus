export type tProps = {
  event: tEvent,
  rsvps?: tRSVP[],
};

export type tState = {
  hasRSVPed: boolean,
  initialRSVP: boolean,
  rsvp: tRSVP,
};

export type tStore = {
  event: tThunk<tEvent>,
  rsvps: tThunk<tRSVP[]>,
};
