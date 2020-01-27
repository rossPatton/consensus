import {match} from 'react-router-dom';

// TODO happy leftovers from before role de-coupling, eventually remove
export type tOrgWithRole = tOrg & {role: tRole};

export type tProps = {
  orgs: tOrgWithRole[],
};

export type tState = {
  orgs: tOrgWithRole[],
};

export type tComponentProps = tProps & {
  leaveOrg: (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
};

export type tContainerProps = tProps & {
  deleteOrgByUserIdDispatch: (query: tDeleteUserByOrgIdQuery) => void,
  getOrgsByUserIdDispatch: (query: tOrgsByUserIdQuery) => void,
  match: match & {params: tPaginateParams},
  session: tSession,
};

export type tStore = {
  orgsByUserId: tThunk<any[]>,
};
