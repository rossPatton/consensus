import { match } from 'react-router';

export type tComponentProps = {
  allEvents: tEvent[],
  eventsToRender: tEvent[],
  match: match & { params: tOrgRouteParams },
}

export type tContainerProps = {
  events: tEvent[],
  getEventsByOrg: (query: tIdQuery) => Promise<tThunk<tEvent[]>>,
  isLoading: boolean,
  match: match & { params: tOrgRouteParams },
  org: tOrg,
};

export type tState = {
  events: tThunk<tEvent[]>,
  isLoading: boolean,
};
