import {Location} from 'history';
import {match} from 'react-router';

export type tState = {
  showPast: boolean,
}

type tBaseProps = {
  events: tEvent[],
  match: match & {params: tOrgRouteParams},
  role: tRole,
}

export type tComponentProps = tBaseProps & {
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  privacyFilter: tPrivacyFilter,
  showPast: boolean,
  togglePast: (ev: React.MouseEvent<HTMLButtonElement>) => void,
};

export type tContainerProps = tBaseProps & {
  getEventsDispatch: (query: tGetEventQuery) => tThunkPayload<tEvent[]>,
  isLoading: boolean,
  location: Location,
  org: tOrg,
  session: tSession,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  isLoading: boolean,
}
