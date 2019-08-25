import { Location } from 'history';
import { match } from 'react-router';

export type tProps = {
  isLoading: boolean,
  location: Location,
  match: match & { params: tOrgRouteParams },
  org: tOrg,
  usersByOrg: tUsersByOrg,
  role: tRole,
};

export type tContainerProps = tProps & {
  getDecisionsByOrg: (id: number) => Promise<tThunk<tDecision[]>>,
  getEvents: (id: number) => Promise<tThunk<tEvent[]>>,
  getOrg: (params: tOrgRouteParams) => Promise<tThunk<tOrg>>,
  session: tSession,
};

export type tStore = {
  decisions: tThunk<tDecision[]>,
  events: tThunk<tEvent[]>,
  org: tThunk<tOrg>,
  session: tThunk<tSession>,
  usersByOrg: tThunk<tUsersByOrg>,
};