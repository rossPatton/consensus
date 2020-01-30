import {tAdminSections} from '../../../_types';

export type tProps = {
  match: tAdminSections,
};

export type tStore = {
  eventsByUserId: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};

export type tComponentProps = tProps & {
  events: tEvent[],
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
};

export type tContainerProps = tProps & {
  eventsByUserIdThunk: tThunk<tEvent[]>,
  getEventsByUserIdDispatch: (query: {userId: number}) => tThunkPayload<tEvent[]>,
  sessionThunk: tThunk<tSession>,
};
