import {match} from 'react-router';

export type tComponentProps = {
  events: tEvent[],
  onFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
}

export type tContainerProps = {
  events: tEvent[],
  getEvents: (query: tIdQuery) => Promise<tThunk<tEvent[]>>,
  isLoading: boolean,
  match: match & { params: tOrgRouteParams },
  org: tOrg,
};

export type tState = {
  events: tEvent[]
  isPublicFilter: boolean | null,
};

export type tStore = {
  events: tThunk<tEvent[]>,
  isLoading: boolean,
};
