export type tProps = {
  session: tSession,
  // render mobile/sidebar version
  tiny?: boolean,
};

export type tContainerProps = tProps & {
  events: tEvent[],
  getRsvps: () => Promise<tThunk<tRSVP[]>>,
  role: tRole,
  rsvps: tRSVP[],
  setRsvp: (query: {id: number, value: boolean}) => Promise<any>,
};

export type tComponentProps = tProps & {
  events: tLoggedInEvent[],
  setRsvp: (
    ev: React.FormEvent<HTMLFormElement>,
    eventId: number,
    value: boolean,
  ) => void,
};

export type tStore = {
  role: tThunk<tRole>,
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<tSession>,
}
