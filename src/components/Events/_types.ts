export type tProps = {
  events: tEvent[],
  // if user is an admin, they can edit events
  isEditable?: boolean,
  // render mobile/sidebar version
  tiny?: boolean,
};

export type tStore = {
  role: tThunk<tRole>,
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<tSession>,
}
