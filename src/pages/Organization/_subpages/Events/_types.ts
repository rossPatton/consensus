import {Location} from 'history';
import {match} from 'react-router';

export interface tState {
  showPast: boolean,
}

interface tBaseProps {
  events: tEvent[],
  match: match & {params: tOrgRouteParams},
  role: tRole,
}

export interface tComponentProps extends tBaseProps {
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  privacyFilter: tPrivacyFilter,
  showPast: boolean,
  togglePast: (ev: React.MouseEvent<HTMLButtonElement>) => void,
}

export interface tContainerProps extends tBaseProps {
  getEvents: (query: tGetEventQuery) => tThunkPayload<tEvent[]>,
  isLoading: boolean,
  location: Location,
  org: tOrg,
  session: tSession,
}

export interface tStore {
  eventsByOrgId: tThunk<tEvent[]>,
  isLoading: boolean,
}
