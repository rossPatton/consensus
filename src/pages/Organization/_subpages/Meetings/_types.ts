import {match} from 'react-router';

type tProps = {
  org: tGroup,
  role: tRole,
};

export type tComponentProps = tSearchFilterProps & tProps & {
  events: tEvent[],
  hideMeetings: boolean,
  originalEvents: tEvent[],
  type: 'drafts' | 'events',
};

export type tContainerProps = tProps & {
  eventsByOrgIdThunk: tThunk<tEvent[]>,
  isLoading: boolean,
  match: match & {params: tGroupRouteParams},
  session: tSession<tUser | tGroup>,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  session: tThunk<tSession<tUser | tGroup>>,
};
