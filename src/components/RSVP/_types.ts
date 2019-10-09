export type tSetRsvpOpts = {
  ev: React.FormEvent<HTMLFormElement>,
  eventId: number,
  value: boolean,
};

export type tState = {
  rsvp: boolean,
};

export type tProps = {
  role?: tRole,
  session: tSession,
};

export type tContainerProps = tProps &{
  event: tEvent,
  // redux thunk
  setRsvp: (query: {
    id: number,
    type: 'public' | 'private',
    value: boolean,
  }) => void,
};

export type tComponentProps = tProps & {
  id: number,
  rsvp: boolean,
  // class method passed down to component that calls the redux thunk
  setRsvp: (opts: tSetRsvpOpts) => void,
};

export type tStore = {
  session: tThunk<tSession>,
};
