import {match} from 'react-router-dom';

// TODO happy leftovers from before role de-coupling, eventually remove
export type tOrgWithRole = tOrg & {role: tRole};

export type tProps = {
  orgs: tOrgWithRole[],
};

export type tComponentProps = tProps & {
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  leaveOrg: (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => void,
};

export type tContainerProps = tProps & {
  match: match & {params: tPaginateParams},
  // from redux
  leaveOrg: (query: {orgId: number}) => void,
  getOrgsBySession: () => void,
  session: tSession,
};

export type tState = {
  orgs: tOrgWithRole[],
};

export type tStore = {
  orgs: tThunk<any[]>,
};
