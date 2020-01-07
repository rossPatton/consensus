import {History} from 'history';

export type tSetRsvpOpts = {
  ev: React.FormEvent<HTMLFormElement>,
  eventId: number,
  value: boolean,
};

export type tRSVPQuery = {
  id: number,
  type: 'public' | 'private',
  value: boolean,
};

export type tState = {
  rsvp: boolean,
};

export type tProps = {
  role?: tRole,
  session: tSession,
};

export type tContainerProps = tProps & {
  event: tEvent,
  history: History,
  // redux thunk
  setRsvp: (query: tRSVPQuery) => void,
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
