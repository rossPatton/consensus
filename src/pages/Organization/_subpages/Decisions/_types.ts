import { match } from 'react-router';

export type tComponentProps = {
  decisions: tDecision[],
}

export type tContainerProps = {
  decisions: tDecision[],
  getDecisionsByOrg: (query: tIdQuery) => Promise<tThunk<tDecision[]>>,
  isLoading: boolean,
  match: match & { params: tOrgRouteParams },
  org: tOrg,
};

export type tStore = {
  decisions: tThunk<tDecision[]>,
  isLoading: boolean,
};
