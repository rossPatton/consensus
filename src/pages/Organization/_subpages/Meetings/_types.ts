import {match} from 'react-router';

type tProps = {
  org: tOrg, // inherited
  role: tRole,
};

export type tComponentProps = tSearchFilterProps & tProps & {
  events: tEvent[],
  hideMeetings: boolean,
  type: 'drafts' | 'events',
};

export type tContainerProps = tProps & {
  eventsByOrgIdThunk: tThunk<tEvent[]>,
  isLoading: boolean,
  match: match & {params: tOrgRouteParams},
  session: tSession<tUser | tOrg>,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  session: tThunk<tSession<tUser | tOrg>>,
};
