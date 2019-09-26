import {match} from 'react-router';

export type tProps = {
  events: tEvent[],
  org: tOrg,
  role: tRole,
};

export type tComponentProps = tProps & {
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onPublishedFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,

}

export type tContainerProps = tProps & {
  getEvents: (query: tIdQuery) => Promise<tThunk<tEvent[]>>,
  isLoading: boolean,
  match: match & {params: tOrgRouteParams},
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
