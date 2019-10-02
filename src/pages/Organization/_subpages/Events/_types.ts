import { match } from 'react-router';

export type tProps = {
  events: tEvent[],
  role: tRole,
};

export type tContainerProps = tProps & {
  getEvents: (query: tIdQuery) => Promise<tThunk<tEvent[]>>,
  isLoading: boolean,
  match: match & { params: tOrgRouteParams },
  org: tOrg,
  session: tSession,
};

export type tState = {
  events: tThunk<tEvent[]>,
  isLoading: boolean,
};
