import {Location} from 'history';
import {match} from 'react-router';

export type tProps = {
  decisions: tDecision[],
  isClosed?: boolean,
};

export type tState = {
  decisions: tDecision[],
  typeFilter: tDecisionType,
};

export type tComponentProps = tProps & {
  onTypeFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  pathname: string,
};

export type tContainerProps = tProps & {
  getDecisionsByOrg:
    (query: tIdQuery & {isClosed: boolean}) => Promise<tThunk<tDecision[]>>,
  isLoading: boolean,
  location: Location,
  match: match & { params: tOrgRouteParams },
  org: tOrg,
  role: tRole,
};

export type tStore = {
  decisions: tThunk<tDecision[]>,
  isLoading: boolean,
};
