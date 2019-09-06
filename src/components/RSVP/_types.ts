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
  // redux thunk
  setRsvp: (query: {id: number, value: boolean}) => void,
};

export type tComponentProps = {
  id: number,
  rsvp: boolean,
  // class method passed down to component that calls the redux thunk
  setRsvp: (opts: tSetRsvpOpts) => void,
};
