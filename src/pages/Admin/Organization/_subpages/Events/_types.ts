import {tAdminSections} from '../../../_types';

export type tProps = {
  events: tEvent[],
};

export type tComponentProps = tProps & {
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onPublishedFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
};

export type tContainerProps = tProps & {
  getEvents: (query: tIdQuery) => Promise<tThunk<tEvent[]>>,
  isLoading: boolean,
  match: tAdminSections,
  session: tSession,
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
