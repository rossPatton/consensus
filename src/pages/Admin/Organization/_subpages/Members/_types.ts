import {tAdminSections} from '../../../_types';

export type tStore = {
  usersByOrg: tThunk<tUsersByOrg>,
};

export type tState = {
  role: tRole,
};

export type tProps = {
  match: tAdminSections,
};

export interface tContainerProps extends tProps {
  deleteUserByOrg: (query: tDeleteUserOrgQuery) => tThunkReturn<tUsersByOrg>,
  getUsersByOrg: (query: tIdQueryC) => tThunkReturn<tUsersByOrg>,
  isLoading: boolean,
  patchUserByOrg: (opts: tPatchUserRoleQuery) => tThunkReturn<tAccountRoleRelation>,
  session: tSession,
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
