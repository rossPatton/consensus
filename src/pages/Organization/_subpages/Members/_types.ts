import {tAdminSections} from '../../../_types';

export type tStore = {
  usersByOrg: tThunk<tUsersByOrg>,
};

export type tState = {
  role: tRole,
};

export type tRoleOpts = {
  role: tRole,
  orgId: number,
  userId: number,
};

export type tProps = {
  match: tAdminSections,
};

export interface tContainerProps extends tProps {
  deleteUserByOrg: (query: {orgId: number, userId: number}) => void,
  getUsersByOrg: (query: tIdQuery) => any,
  isLoading: boolean,
  session: tSession,
  updateRole: (opts: tRoleOpts) => void,
  usersByOrg: tUsersByOrg,
}

export interface tComponentProps extends tProps {
  deleteUserByOrg: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  onRoleFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  setUserRole: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  users: tUser[],
  userTotal: number,
}
