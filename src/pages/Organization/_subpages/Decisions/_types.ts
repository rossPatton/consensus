import {Location} from 'history';
import {match} from 'react-router';

export type tProps = {
  decisions: tDecision[],
  isClosed?: boolean,
  match: match & {params: tOrgRouteParams},
};

export type tComponentProps = tProps & {
  decisionFilter: tDecisionType,
  items: tDecision[],
  onDecisionTypeChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  pathname: string,
};

type tIdQueryExtend = tIdQuery & {isClosed: boolean};
export type tContainerProps = tProps & {
  getDecisionsByOrg: (query: tIdQueryExtend) => Promise<tThunk<tDecision[]>>,
  isLoading: boolean,
  location: Location,
  org: tOrg,
  role: tRole,
};

export type tStore = {
  decisions: tThunk<tDecision[]>,
  isLoading: boolean,
};
