import { match } from 'react-router';

export type tComponentProps = {
  decisions: tDecision[],
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
}

export type tContainerProps = {
  decisions: tDecision[],
  getDecisions: (query: tIdQuery) => Promise<tThunk<tDecision[]>>,
  isLoading: boolean,
  match: match & { params: tOrgRouteParams },
  org: tOrg,
};

export type tState = {
  decisions: tThunk<tDecision[]>,
  isLoading: boolean,
};
