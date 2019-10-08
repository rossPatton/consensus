export type tSetRsvpOpts = {
  ev: React.FormEvent<HTMLFormElement>,
  eventId: number,
  value: boolean,
};

export type tState = {
  rsvp: boolean,
};

export type tContainerProps = {
  event: tEvent,
  role?: tRole,
  session: tSession,
  // redux thunk
  setRsvp: (query: {
    id: number,
    type: 'public' | 'private',
    value: boolean,
  }) => void,
};

export type tComponentProps = {
  id: number,
  privateRSVP: boolean,
  role?: tRole,
  rsvp: boolean,
  // class method passed down to component that calls the redux thunk
  setRsvp: (opts: tSetRsvpOpts) => void,
};

export type tStore = {
  session: tThunk<tSession>,
};
