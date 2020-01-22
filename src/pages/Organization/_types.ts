import {Location} from 'history';
import {match} from 'react-router';

export interface tProps {
  location: Location,
  match: match & {params: tOrgRouteParams},
  org: tOrg,
  session: tSession,
  usersByOrg: tUsersByOrg,
}

export type tComponentProps = tProps & {
  role: tRole,
}

export type tContainerProps = tProps & {
  getEvents: (id: number) => tThunkReturn<tEvent[]>,
  getOrg: (params: tOrgRouteParams) => tThunkReturn<tOrg>,
  getRoles: () => tThunkReturn<tRoleMap[]>,
  getRsvps: () => tThunkReturn<tRSVP[]>,
  isLoading: boolean,
  roles: tRoleMap[],
  session: tSession,
};

export type tStore = {
  events: tThunk<tEvent[]>,
  org: tThunk<tOrg>,
  roles: tThunk<tRoleMap[]>,
  session: tThunk<tSession>,
  usersByOrg: tThunk<tUsersByOrg>,
};
