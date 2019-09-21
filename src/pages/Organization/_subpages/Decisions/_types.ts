import { match } from 'react-router';

export type tProps = {
  decisions: tDecision[],
  role: tRole,
};

export type tContainerProps = tProps & {
  getDecisionsByOrg: (query: tIdQuery) => Promise<tThunk<tDecision[]>>,
  isLoading: boolean,
  match: match & { params: tOrgRouteParams },
  org: tOrg,
};

export type tStore = {
  decisions: tThunk<tDecision[]>,
  isLoading: boolean,
};
