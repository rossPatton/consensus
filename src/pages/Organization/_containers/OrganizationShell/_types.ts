import { Location } from 'history';
import { match } from 'react-router';

export type tProps = {
  isLoading: boolean,
  location: Location,
  match: match,
  org: tOrg,
  usersByOrg: tUsersByOrg,
};

export type tContainerProps = tProps & {
  getDecisionsByOrg: (id: number) => Promise<tThunk<tDecision[]>>,
  getEvents: (id: number) => Promise<tThunk<tEvent[]>>,
  getOrg: (params: object) => Promise<tThunk<tOrg>>,
  getUsersByOrg: (params: object) => Promise<tThunk<tUsersByOrg>>,
};

export type tState = {
  decisions: tThunk<tDecision[]>,
  events: tThunk<tEvent[]>,
  org: tThunk<tOrg>,
  usersByOrg: tThunk<tUsersByOrg>,
}
