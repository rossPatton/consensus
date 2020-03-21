import * as H from 'history';
import { match } from 'react-router';

export type tStore = {
  event: tThunk<tEvent>,
  eventsByOrgId: tThunk<tEvent[]>,
  org: tThunk<tGroup>,
  isLoading: boolean,
  roles: tThunk<tRoleMap[]>,
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<tSession>
}

export type tProps = {
  eventsByOrgId: tEvent[],
};

export type tComponentProps = tProps & {
  event: tEvent,
  org: tGroup,
  rsvp: tRSVP,
};

export type tContainerProps = tProps & {
  eventThunk: tThunk<tEvent>,
  getEventDispatch: (query: tGetEventQuery) => tThunkPayload<tEvent>,
  getEventsByOrgIdDispatch: (query: tGetEventQuery) => tThunkPayload<tEvent[]>,
  getGroupByIdDispatch: (query: tGroupQuery) => tThunkPayload<tGroup>,
  getRolesDispatch: () => tThunkPayload<tRoleMap>,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  location: H.Location,
  match: match & { params: tEventParams },
  orgThunk: tThunk<tGroup>,
  rolesThunk: tThunk<tRoleMap[]>,
  rsvpsThunk: tThunk<tRSVP[]>,
  session: tSession,
}

