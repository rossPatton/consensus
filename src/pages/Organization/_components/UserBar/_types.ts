import { match } from 'react-router';

export type tProps = {
  match: match,
  org: tOrg,
  role: tRole,
  session: tSession,
  usersByOrg: tUser[],
};

export type tContainerProps = tProps & {
  getUsersByOrgIdDispatch: (query: tUsersByOrgIdQuery) => tThunkPayload<tUser[]>,
  isLoading: boolean,
};

export type tComponentProps = tProps & {
  role: tRole,
};

export type tStore = {
  usersByOrg: tThunk<tUser[]>,
};
