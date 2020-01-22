import {tAdminSections} from '../../../_types';

export type tProps = {
  events: tEvent[],
  match: tAdminSections,
};

export type tComponentProps = tProps & {
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onPublishedFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
};

export type tContainerProps = tProps & {
  getEvents: (query: tIdQueryC) => tThunkReturn<tEvent[]>,
  isLoading: boolean,
  session: tSession,
};

export type tState = {
  publishedFilter: tPublishedFilter,
};

export type tStore = {
  events: tThunk<tEvent[]>,
  isLoading: boolean,
};
