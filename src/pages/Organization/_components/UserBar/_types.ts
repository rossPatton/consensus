import { match } from 'react-router';

export type tProps = {
  match: match,
  org: tOrg,
  role: tRole,
  session: tSession,
  usersByOrg: tUsersByOrg,
};

export type tContainerProps = tProps & {
  getUsersByOrg: (query: tIdQuery) => Promise<tThunk<tUsersByOrg>>,
  isLoading: boolean,
};

export type tComponentProps = tProps & {
  role: tRole,
};

export type tStore = {
  usersByOrg: tThunk<tUsersByOrg>,
};
