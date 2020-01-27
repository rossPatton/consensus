import {tAdminSections} from '../../../_types';

export type tStore = {
  usersByOrg: tThunk<tUser[]>,
};

export type tState = {
  role: tRole,
};

export type tProps = {
  match: tAdminSections,
};

export interface tContainerProps extends tProps {
  deleteUserByOrgIdDispatch: (query: tDeleteUserByOrgIdQuery) =>
    tThunkPayload<tUser[]>,
  getUsersByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    tThunkPayload<tUser[]>,
  isLoading: boolean,
  patchUserByOrgIdDispatch: (opts: tPatchUserRoleQuery) =>
    tThunkPayload<tAccountRoleRelation>,
  session: tSession,
  usersByOrg: tUser[],
}

export interface tComponentProps extends tProps {
  removeUser: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  onRoleFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  setUserRole: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  users: tUser[],
  userTotal: number,
}
