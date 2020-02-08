import {match} from 'react-router';

export type tComponentProps = {
  events: tEvent[],
  match: match & {params: tOrgRouteParams},
  org: tOrg, // inherited
  role: tRole,
  type: 'drafts' | 'events';
};

export type tContainerProps = tComponentProps & {
  isLoading: boolean,
  session: tSession,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};
