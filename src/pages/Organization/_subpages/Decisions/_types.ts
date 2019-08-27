import { match } from 'react-router';

export type tComponentProps = {
  allDecisions: tDecision[],
  decisionsToRender: tDecision[],
  match: match & { params: tOrgRouteParams },
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
