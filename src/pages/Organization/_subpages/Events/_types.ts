import {Location} from 'history';
import {match} from 'react-router';

export type tProps = {
  events: tEvent[],
  role: tRole,
};

export type tState = {
  events: tEvent[],
  privacyFilter: tPrivacyFilter,
};

export type tComponentProps = tProps & {
  filterType: tPrivacyFilter,
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

export type tStore = {
  events: tThunk<tEvent[]>,
  isLoading: boolean,
};
