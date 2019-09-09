import { match } from 'react-router';

export type tComponentProps = {
  events: tEvent[],
}

export type tContainerProps = {
  events: tEvent[],
  getEvents: (query: tIdQuery) => Promise<tThunk<tEvent[]>>,
  isLoading: boolean,
  match: match & { params: tOrgRouteParams },
  org: tOrg,
};

export type tState = {
  events: tThunk<tEvent[]>,
  isLoading: boolean,
};
