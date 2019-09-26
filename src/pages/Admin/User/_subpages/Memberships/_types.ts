import {match} from 'react-router-dom';

// TODO happy leftovers from before role de-coupling, eventually remove
export type tOrgWithRole = tOrg & {role: tRole};

export type tProps = {
  orgs: tOrgWithRole[],
};

export type tComponentProps = tProps & {
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  deleteOrgByUser: (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => void,
};

export type tContainerProps = tProps & {
  match: match,
  // from redux
  deleteOrgByUser: (query: {accountId: number, orgId: number}) => void,
  getOrgsByUser: () => void,
  session: tSession,
};

export type tState = {
  orgs: tOrgWithRole[],
};

export type tStore = {
  orgs: tThunk<any[]>,
};
