import {match} from 'react-router-dom';

export type tProps = {
  events: tEvent[],
};

export type tStore = {
  events: tThunk<tEvent[]>,
}

export type tComponentProps = tProps & {
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
};

export type tContainerProps = tProps & {
  match: match,
  getEventsByUser: () => void,
  session: tSession,
};
