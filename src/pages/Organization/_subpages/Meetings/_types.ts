import {match} from 'react-router';

type tProps = {
  org: tOrg, // inherited
  role: tRole,
  type: 'drafts' | 'events',
};

export type tComponentProps = tSearchFilterProps & tProps & {
  events: tEvent[],
};

export type tContainerProps = tProps & {
  eventsByOrgIdThunk: tThunk<tEvent[]>,
  isLoading: boolean,
  match: match & {params: tOrgRouteParams},
  session: tSession,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};
