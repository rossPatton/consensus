import {tAdminSections} from '../../../_types';

export type tComponentProps = {
  decisions: tDecision[],
  match: tAdminSections,
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
