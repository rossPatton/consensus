import { match } from 'react-router';

export type tStore = {
  event: tThunk<tEvent>,
  eventsByOrgId: tThunk<tEvent[]>,
  org: tThunk<tOrg>,
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
  org: tOrg,
};

export type tContainerProps = tProps & {
  eventThunk: tThunk<tEvent>,
  getEventDispatch: (query: tIdQuery) => tThunkPayload<tEvent>,
  getEventsByOrgIdDispatch: (query: tGetEventQuery) => tThunkPayload<tEvent[]>,
  getOrgByIdDispatch: (query: tIdQuery) => tThunkPayload<tOrg>,
  getRolesDispatch: () => tThunkPayload<tRoleMap>,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  match: match & { params: tEventParams },
  orgThunk: tThunk<tOrg>,
  rolesThunk: tThunk<tRoleMap[]>,
  rsvpsThunk: tThunk<tRSVP[]>,
  session: tSession,
}

