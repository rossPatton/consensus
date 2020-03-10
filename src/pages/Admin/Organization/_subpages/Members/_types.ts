import {tAdminSections} from '../../../_types';

export type tStore = {
  session: tThunk<tSession>,
  usersByOrgId: tThunk<tUser[]>,
};

export type tContainerProps = {
  deleteUserByOrgIdDispatch: (query: tDeleteUserByOrgIdQuery) =>
    tThunkPayload<tUser[]>,
  getUsersByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    tThunkPayload<tUser[]>,
  match: tAdminSections,
  patchUserByOrgIdDispatch: (opts: tPatchUserRoleQuery) =>
    tThunkPayload<tAccountRoleRelation>,
  session: tSession,
  usersThunk: tThunk<tUser[]>,
}

export type tComponentProps = {
  approvals: tUser[],
  removeUser: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  onRoleFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  session: tSession,
  setUserRole: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  users: tUser[],
  userTotal: number,
}
