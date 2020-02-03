import { match } from 'react-router';

export type tProps = {
  match: match,
  org: tOrg,
  role: tRole,
  session: tSession,
};

export type tContainerProps = tProps & {
  getUsersByOrgIdDispatch: (query: tUsersByOrgIdQuery) => tThunkPayload<tUser[]>,
  isLoading: boolean,
  usersByOrg: tUser[],
};

export type tComponentProps = tProps & {
  members: tUser[],
  pending: tUser[],
  role: tRole,
};

export type tStore = {
  usersByOrg: tThunk<tUser[]>,
};
