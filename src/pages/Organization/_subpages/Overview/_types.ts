import {match} from 'react-router';

export type tComponentProps = {
  decisions: tDecision[],
  events: tEvent[],
  match: match & {params: tOrgRouteParams},
  org: tOrg, // inherited
  role: tRole,
};

type tQuery = tIdQuery & {isClosed?: boolean, showPast?: boolean};
export type tContainerProps = tComponentProps & {
  getEvents: (query: tQuery) => Promise<tThunk<tEvent[]>>,
  getDecisionsByOrg: (query: tQuery) => Promise<tThunk<tDecision[]>>,
  isLoading: boolean,
  session: tSession,
};

export type tStore = {
  decisions: tThunk<tDecision[]>,
  events: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};
