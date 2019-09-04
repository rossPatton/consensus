export type tProps = {
  events: tEvent[],
  // render mobile/sidebar version
  tiny?: boolean,
};

export type tStore = {
  role: tThunk<tRole>,
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<tSession>,
}
