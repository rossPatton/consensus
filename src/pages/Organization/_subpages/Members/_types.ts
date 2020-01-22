import H from 'history';
import {match} from 'react-router';

export type tStore = {
  usersByOrg: tThunk<tUsersByOrg>,
};

export type tState = {
  role: tRole,
};

export type tBaseProps = {
  match: match & {params: tOrgRouteParams},
  org: tOrg,
  role: tRole,
}

export type tContainerProps = tBaseProps & {
  deleteUserByOrg: (query: tDeleteUserOrgQuery) => void,
  getUsersByOrg: (query: tIdQueryC) => any,
  isLoading: boolean,
  patchUserByOrg: (opts: tPatchUserRoleQuery) => void,
  router: H.Location,
  session: tSession,
  usersByOrg: tUsersByOrg,
}

export type tComponentProps = tBaseProps & {
  deleteUserByOrg: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  onRoleFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  setUserRole: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  users: tUser[],
  userTotal: number,
}
