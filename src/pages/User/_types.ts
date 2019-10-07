import { match } from 'react-router';

export type tStore = {
  orgs: tThunk<tOrg[]>,
  user: tThunk<tUser>,
  isLoading: boolean,
};

type tOrgWRole = tOrg & {role: tRole};

export type tProps = {
  orgs: tOrgWRole[],
  user: tUser,
};

export type tContainerProps = tProps & {
  getOrgsByUser: (query: tIdQuery) => Promise<any>,
  getUserById: (query: tIdQuery) => Promise<any>,
  isLoading: boolean,
  match: match & { params: { id: number } },
};


