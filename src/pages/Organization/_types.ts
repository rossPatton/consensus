import {Location} from 'history';
import {match} from 'react-router';

export interface tProps {
  location: Location,
  match: match & {params: tOrgRouteParams},
  session: tSession,
}

export type tComponentProps = tProps & {
  org: tOrg,
  role: tRole,
}

export type tContainerProps = tProps & {
  getOrg: (params: tGetOrgQuery) => tThunkPayload<tOrg>,
  getRoles: () => tThunkPayload<tRoleMap[]>,
  getRsvps: () => tThunkPayload<tRSVP[]>,
  isLoading: boolean,
  org: tThunk<tOrg>,
  roles: tRoleMap[],
  session: tSession,
};

export type tStore = {
  events: tThunk<tEvent[]>,
  org: tThunk<tOrg>,
  roles: tThunk<tRoleMap[]>,
  session: tThunk<tSession>,
};
