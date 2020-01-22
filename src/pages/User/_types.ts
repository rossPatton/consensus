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
  getOrgsByUser: (query: tIdQueryC) => Promise<any>,
  getUserById: (query: tIdQueryC) => Promise<any>,
  isLoading: boolean,
  match: match & { params: { id: number } },
};


