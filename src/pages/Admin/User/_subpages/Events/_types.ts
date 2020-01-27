import {match} from 'react-router-dom';

import {tAdminSections} from '../../../_types';

export type tProps = {
  eventsByUserId: tEvent[],
  match: tAdminSections,
};

export type tStore = {
  eventsByUserId: tThunk<tEvent[]>,
};

export type tComponentProps = tProps & {
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
};

export type tContainerProps = tProps & {
  match: match & {params: tPaginateParams},
  getEventsByUserId: (query: {userId: number}) => tThunkPayload<tEvent[]>,
  session: tSession,
};
