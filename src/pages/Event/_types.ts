import { match } from 'react-router';

export type tStore = {
  event: tThunk<tEvent>,
  events: tThunk<tEvent[]>,
  isLoading: boolean,
}

export type tProps = {
  event: tEvent,
  events: tEvent[],
  match: match & { params: { id: number } },
};

export interface tContainerProps extends tProps {
  getEventById: (query: tIdQuery) => Promise<any>,
  getEvents: (query: tIdQuery) => Promise<any>,
  isLoading: boolean,
}

