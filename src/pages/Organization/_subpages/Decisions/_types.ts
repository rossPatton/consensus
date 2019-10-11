import {Location} from 'history';
import {match} from 'react-router';

export type tProps = {
  decisions: tDecision[],
  isClosed?: boolean,
};

export type tComponentProps = tProps & {
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
