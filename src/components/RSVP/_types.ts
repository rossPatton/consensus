import {History} from 'history';
import {RouteComponentProps} from 'react-router';

export type tSetRsvpOpts = {
  ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  eventId: number,
}

export type tStore = {
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<tSession>,
};

export type tState = {
  hasRSVPed: boolean, // switch for immediately updating UI on client
  hasMounted: boolean,
  rsvp?: tRSVP, // pick out the rsvp from the rsvps state object
};

type tProps = {
  className?: string,
  event: tEvent,
  role?: tRole,
  session: tSession,
};

export type tContainerProps = RouteComponentProps<any> & tProps & {
  history: History,
  isLoading: boolean,
  patchRsvpDispatch: (query: tRSVPQuery) => tThunkPayload<tRSVP>,
  postRsvpDispatch: (query: tRSVPQuery) => tThunkPayload<tRSVP>,
  rsvp?: tRSVP,
  rsvps: tRSVP[],
};

export type tComponentProps = tMediaContext & tProps & {
  hasRSVPed: boolean,
  hasMounted: boolean,
  rsvp?: tRSVP,
  setRsvp: (opts: tSetRsvpOpts) => void,
};
