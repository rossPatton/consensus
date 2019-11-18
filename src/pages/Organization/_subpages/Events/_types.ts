import {Location} from 'history';
import {match} from 'react-router';

interface tBaseProps {
  events: tEvent[],
  match: match & {params: tOrgRouteParams},
  role: tRole,
}

export interface tComponentProps extends tBaseProps {
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  pathname: string,
  privacyFilter: tPrivacyFilter,
  showPast: boolean,
}

type tIdQueryExtend = tIdQuery & {isDraft: boolean, showPast: boolean};
export interface tContainerProps extends tBaseProps {
  getEvents: (query: tIdQueryExtend) => Promise<tThunk<tEvent[]>>,
  isLoading: boolean,
  location: Location,
  org: tOrg,
  session: tSession,
}

export interface tStore {
  events: tThunk<tEvent[]>,
  isLoading: boolean,
}
