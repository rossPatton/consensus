import {match} from 'react-router-dom';

import {tAdminSections} from '../../../_types';

export type tProps = {
  events: tEvent[],
  match: tAdminSections,
};

export type tState = {
  events: tEvent[],
  privacyFilter: tPrivacyFilter,
};

export type tStore = {
  events: tThunk<tEvent[]>,
};

export type tComponentProps = tProps & {
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
};

export type tContainerProps = tProps & {
  match: match & {params: tPaginateParams},
  getEventsByUser: () => tThunkReturn<tEvent[]>,
  session: tSession,
};
