import {History} from 'history';
import {RouteComponentProps} from 'react-router';

export type tSetRsvpOpts = {
  ev: React.FormEvent<HTMLFormElement>,
  eventId: number,
  value: boolean,
}

export type tState = {
  rsvp: boolean,
};

type tProps = {
  role?: tRole,
  session: tSession,
}

export type tContainerProps = RouteComponentProps<any> & tProps & {
  event: tEvent,
  history: History,
  // redux thunk
  postRsvpDispatch: (query: tRSVPQuery) => tThunkPayload<tRSVP>,
}

export type tComponentProps = tProps & {
  id: number,
  rsvp: boolean,
  // class method passed down to component that calls the redux thunk
  postRsvp: (opts: tSetRsvpOpts) => void,
}

export type tStore = {
  session: tThunk<tSession>,
};
