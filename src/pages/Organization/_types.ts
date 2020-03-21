import {Location} from 'history';
import {match} from 'react-router';

export type tProps = {
  location: Location,
  match: match & {params: tGroupRouteParams},
  session: tSession,
};

export type tComponentProps = tProps & {
  org: tGroup,
  role: tRole,
};

export type tContainerProps = tProps & {
  getEventsByOrgIdDispatch: (query: tGetEventQuery) => tThunkPayload<tEvent[]>,
  getGroupDispatch: (query: tGroupQuery) => tThunkPayload<tGroup>,
  getRolesDispatch: () => tThunkPayload<tRoleMap[]>,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  isLoading: boolean,
  orgThunk: tThunk<tGroup>,
  rolesThunk: tThunk<tRoleMap[]>,
  rsvpsThunk: tThunk<tRSVP[]>,
  session: tSession,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  org: tThunk<tGroup>,
  roles: tThunk<tRoleMap[]>,
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<tSession>,
};
