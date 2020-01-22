import {match} from 'react-router';

export type tComponentProps = {
  events: tEvent[],
  match: match & {params: tOrgRouteParams},
  org: tOrg, // inherited
  role: tRole,
};

export type tContainerProps = tComponentProps & {
  getEvents: (query: tEventQueryC) => tThunkReturn<tEvent[]>,
  isLoading: boolean,
  session: tSession,
};

export type tStore = {
  // decisions: tThunk<tDecision[]>,
  events: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};
