import {match} from 'react-router';

export type tStore = {
  session: tThunk<tSession>,
};

export type tProps = {
  match: match & {params: tOrgRouteParams},
  org: tOrg,
  session: tSession,
};
