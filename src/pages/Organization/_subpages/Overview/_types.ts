import {match} from 'react-router';

export type tComponentProps = {
  events: tEvent[],
  match: match & {params: tOrgRouteParams},
  org: tOrg, // inherited
  role: tRole,
};

export type tContainerProps = tComponentProps & {
  getEvents: (query: tGetEventQuery) => tThunkPayload<tEvent[]>,
  isLoading: boolean,
  session: tSession,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};
