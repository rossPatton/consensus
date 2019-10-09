import { match } from 'react-router';

export type tStore = {
  decision: tThunk<tDecision>,
  decisions: tThunk<tDecision[]>,
  isLoading: boolean,
};

export type tProps = {
  decision: tDecision,
  decisions: tDecision[],
  getDecision: (query: tIdQuery) => Promise<{payload: tDecision}>,
  getDecisionsByOrg: (query: tIdQuery) => Promise<{payload: tDecision[]}>,
  isLoading: boolean,
  match: match & { params: { id: number } },
};

export type tComponentProps = {
  decision: tDecision,
  decisions: tDecision[],
};

