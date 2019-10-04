import {match} from 'react-router-dom';

export type tProps = {
  events: tEvent[],
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
  match: match,
  getEventsByUser: () => void,
  session: tSession,
};
