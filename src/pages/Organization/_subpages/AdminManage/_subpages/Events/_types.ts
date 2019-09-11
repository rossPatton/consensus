import {match} from 'react-router';

export type tComponentProps = {
  events: tEvent[],
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onPublishedFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
}

export type tContainerProps = {
  events: tEvent[],
  getEvents: (query: tIdQuery) => Promise<tThunk<tEvent[]>>,
  isLoading: boolean,
  match: match & {params: tOrgRouteParams},
  org: tOrg,
};

export type tPrivacyFilter = 'n/a' | 'public' | 'private';
export type tPublishedFilter = 'n/a' | 'published' | 'draft';

export type tState = {
  events: tEvent[]
  privacyFilter: tPrivacyFilter,
  publishedFilter: tPublishedFilter,
};

export type tStore = {
  events: tThunk<tEvent[]>,
  isLoading: boolean,
};
