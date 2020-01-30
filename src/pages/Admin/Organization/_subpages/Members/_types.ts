import {tAdminSections} from '../../../_types';

export type tStore = {
  session: tThunk<tSession>,
  usersByOrg: tThunk<tUser[]>,
};

export type tProps = {
  match: tAdminSections,
};

export type tContainerProps = tProps & {
  deleteUserByOrgIdDispatch: (query: tDeleteUserByOrgIdQuery) =>
    tThunkPayload<tUser[]>,
  getUsersByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    tThunkPayload<tUser[]>,
  patchUserByOrgIdDispatch: (opts: tPatchUserRoleQuery) =>
    tThunkPayload<tAccountRoleRelation>,
  sessionThunk: tThunk<tSession>,
  usersThunk: tThunk<tUser[]>,
}

export type tComponentProps = tProps & {
  removeUser: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  onRoleFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  setUserRole: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  users: tUser[],
  userTotal: number,
}
