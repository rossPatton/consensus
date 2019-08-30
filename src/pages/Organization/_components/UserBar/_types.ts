import { match } from 'react-router';

export type tProps = {
  match: match,
  org: tOrg,
  role: tRole,
  session: tSession,
  usersByOrg: tUsersByOrg,
};

export type tContainerProps = tProps & {
  isLoading: boolean,
  getUsersByOrg: (query: tIdQuery) => Promise<tThunk<tUsersByOrg>>,
};

export type tStore = {
  role: tThunk<tRole>,
  session: tThunk<tSession>,
  usersByOrg: tThunk<tUsersByOrg>,
};
