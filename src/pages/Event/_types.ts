import { match } from 'react-router';

export type tStore = {
  event: tThunk<tEvent>,
  events: tThunk<tEvent[]>,
  isLoading: boolean,
}

export type tProps = {
  event: tEvent,
  events: tEvent[],
  getEventById: (query: tIdQuery) => Promise<any>,
  getEventsByOrg: (query: tIdQuery) => Promise<any>,
  isLoading: boolean,
  match: match & { params: { id: number } },
};

export type tComponentProps = {
  event: tEvent,
  events: tEvent[],
};

