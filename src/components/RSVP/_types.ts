import {History} from 'history';
import {RouteComponentProps} from 'react-router';

export type tSetRsvpOpts = {
  ev: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  meetingId: number,
}

export type tStore = {
  rsvps: ts.thunk<ts.rsvp[]>,
  session: ts.thunk<ts.session>,
};

export type tState = {
  hasRSVPed: boolean, // switch for immediately updating UI on client
  hasMounted: boolean,
  rsvp?: ts.rsvp, // pick out the rsvp from the rsvps state object
};

type tProps = {
  className?: string,
  meeting: ts.meeting,
  role?: ts.role,
  session: ts.session,
};

export type tContainerProps = RouteComponentProps<any> & tProps & {
  history: History,
  isLoading: boolean,
  patchRsvpDispatch: (query: ts.rsvpQuery) => ts.thunkPayload<ts.rsvp>,
  postRsvpDispatch: (query: ts.rsvpQuery) => ts.thunkPayload<ts.rsvp>,
  rsvp?: ts.rsvp,
  rsvps: ts.rsvp[],
};

export type tComponentProps = ts.mediaContext & tProps & {
  hasRSVPed: boolean,
  hasMounted: boolean,
  rsvp?: ts.rsvp,
  setRsvp: (opts: tSetRsvpOpts) => void,
};
