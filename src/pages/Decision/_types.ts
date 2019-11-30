import { match } from 'react-router';

type tBase = {
  areDecisionsLoading?: boolean,
  isDecisionLoading?: boolean,
}

export interface tComponentProps extends tBase {
  decision: tDecision,
  decisions: tDecision[],
  match: match & { params: { id: number } }
}

export interface tStore extends tBase {
  decision: tThunk<tDecision>,
  decisions: tThunk<tDecision[]>,
}

export interface tContainerProps extends tComponentProps {
  getDecision: (query: tIdQuery) => Promise<{payload: tDecision}>,
  getDecisionsByOrg:
    (query: tIdQuery & {isClosed: boolean}) => Promise<{payload: tDecision[]}>,
}

