import {History} from 'history';

export type tSetRsvpOpts = {
  ev: React.FormEvent<HTMLFormElement>,
  eventId: number,
  value: boolean,
};

export type tState = {
  rsvp: boolean,
};

export interface tProps {
  role?: tRole,
  session: tSession,
}

export interface tContainerProps extends tProps {
  event: tEvent,
  history: History,
  // redux thunk
  setRsvp: (query: tRSVPQuery) => Promise<tThunk<tRSVP>>,
}

export interface tComponentProps extends tProps {
  id: number,
  rsvp: boolean,
  // class method passed down to component that calls the redux thunk
  setRsvp: (opts: tSetRsvpOpts) => void,
}

export type tStore = {
  session: tThunk<tSession>,
};
