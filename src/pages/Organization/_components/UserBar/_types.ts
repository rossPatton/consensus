import { match } from 'react-router';

export type tProps = {
  match: match,
  role: tRole,
  usersByOrg: tUsersByOrg,
};

export type tContainerProps = tProps & {
  getUsersByOrg: (query: tIdQuery) => Promise<tThunk<tUsersByOrg>>,
  org: tOrg,
};

export type tStore = {
  usersByOrg: tThunk<tUsersByOrg>,
};
