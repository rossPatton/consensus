import {match} from 'react-router';

export interface tState {
  showClosed: boolean,
}

export interface tProps {
  decisions: tDecision[],
  match: match & {params: tOrgRouteParams},
}

export interface tComponentProps extends tProps {
  decisionFilter: tDecisionType,
  items: tDecision[],
  onDecisionTypeChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  showClosed: boolean,
  toggleClosed: (ev: React.MouseEvent<HTMLButtonElement>) => void,
}

type tIdQueryExtend = tIdQuery & {isClosed: boolean};
export interface tContainerProps extends tProps {
  getDecisionsByOrg: (query: tIdQueryExtend) => Promise<tThunk<tDecision[]>>,
  isLoading: boolean,
  org: tOrg,
  role: tRole,
}

export type tStore = {
  decisions: tThunk<tDecision[]>,
  isLoading: boolean,
};
