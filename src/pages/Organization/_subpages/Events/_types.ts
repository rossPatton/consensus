import {Location} from 'history';
import {match} from 'react-router';

export type tProps = {
  events: tEvent[],
  role: tRole,
};

export type tComponentProps = tProps & {
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  pathname: string,
  showPast: boolean,
};

type tIdQueryExtend = tIdQuery & {isDraft: boolean, showPast: boolean};
export type tContainerProps = tProps & {
  getEvents: (query: tIdQueryExtend) => Promise<tThunk<tEvent[]>>,
  isLoading: boolean,
  location: Location,
  match: match & {params: tOrgRouteParams},
  org: tOrg,
  session: tSession,
};

export type tState = {
  events: tThunk<tEvent[]>,
  isLoading: boolean,
};
