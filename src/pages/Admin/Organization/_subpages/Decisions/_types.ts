import {tAdminSections} from '../../../_types';

export type tComponentProps = {
  decisionFilter: tDecisionType,
  decisions: tDecision[],
  items: tDecision[],
  match: tAdminSections,
  onDecisionTypeChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
}

export type tContainerProps = {
  decisions: tDecision[],
  getDecisions: (query: tIdQuery) => Promise<tThunk<tDecision[]>>,
  isLoading: boolean,
  match: tAdminSections,
  session: tSession,
};

export type tState = {
  decisions: tThunk<tDecision[]>,
  isLoading: boolean,
};
