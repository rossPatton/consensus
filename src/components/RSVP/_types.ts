import {History} from 'history';
import {RouteComponentProps} from 'react-router';

export type tSetRsvpOpts = {
  ev: React.FormEvent<HTMLFormElement>,
  eventId: number,
  value: boolean,
}

export type tState = {
  hasRSVPed: boolean,
  initialRSVP: boolean,
  method: 'PATCH' | 'POST',
  rsvp?: tRSVP,
};

type tProps = {
  event: tEvent,
  role?: tRole,
  session: tSession,
}

export type tContainerProps = RouteComponentProps<any> & tProps & {
  history: History,
  patchRsvpDispatch: (query: tRSVPQuery) => tThunkPayload<tRSVP>,
  postRsvpDispatch: (query: tRSVPQuery) => tThunkPayload<tRSVP>,
  rsvp?: tRSVP,
}

export type tComponentProps = tProps & {
  hasRSVPed: boolean,
  initialRSVP: boolean,
  rsvp?: tRSVP,
  setRsvp: (opts: tSetRsvpOpts) => void,
}

export type tStore = {
  session: tThunk<tSession>,
};
