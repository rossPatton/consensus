import {Location} from 'history';
import {match} from 'react-router';

export type tProps = {
  location: Location,
  match: match & {params: tOrgRouteParams},
  session: tSession,
};

export type tComponentProps = tProps & {
  org: tOrg,
  role: tRole,
};

export type tContainerProps = tProps & {
  getEventsDispatch: (query: tGetEventQuery) => tThunkPayload<tEvent[]>,
  getOrgDispatch: (query: tIdQuery) => tThunkPayload<tOrg>,
  getRolesDispatch: () => tThunkPayload<tRoleMap[]>,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  isLoading: boolean,
  orgThunk: tThunk<tOrg>,
  rolesThunk: tThunk<tRoleMap[]>,
  rsvpsThunk: tThunk<tRSVP[]>,
  session: tSession,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  org: tThunk<tOrg>,
  roles: tThunk<tRoleMap[]>,
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<tSession>,
};
