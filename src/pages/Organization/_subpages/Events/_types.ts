import {match} from 'react-router';

type tProps = {
  events: tEvent[],
  org: tOrg, // inherited
  role: tRole,
  type: 'drafts' | 'events',
};

export type tComponentProps = tSearchFilterProps & tProps;

export type tContainerProps = tProps & {
  isLoading: boolean,
  match: match & {params: tOrgRouteParams},
  session: tSession,
};

export type tStore = {
  eventsByOrgId: tThunk<tEvent[]>,
  session: tThunk<tSession>,
};
