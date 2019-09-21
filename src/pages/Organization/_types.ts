import {Location} from 'history';
import {match} from 'react-router';

export type tProps = {
  location: Location,
  match: match & { params: tOrgRouteParams },
  org: tOrg,
  session: tSession,
  usersByOrg: tUsersByOrg,
};

export type tComponentProps = tProps & {
  role: tRole,
};

export type tContainerProps = tProps & {
  getDecisionsByOrg: (id: number) => Promise<tThunk<tDecision[]>>,
  getEvents: (id: number) => Promise<tThunk<tEvent[]>>,
  getOrg: (params: tOrgRouteParams) => Promise<tThunk<tOrg>>,
  getRoles: (query: {id: number}) => Promise<tThunk<tRoleMap[]>>,
  isLoading: boolean,
  roles: tRoleMap[],
  session: tSession,
};

export type tStore = {
  decisions: tThunk<tDecision[]>,
  events: tThunk<tEvent[]>,
  org: tThunk<tOrg>,
  roles: tThunk<tRoleMap[]>,
  session: tThunk<tSession>,
  usersByOrg: tThunk<tUsersByOrg>,
};
