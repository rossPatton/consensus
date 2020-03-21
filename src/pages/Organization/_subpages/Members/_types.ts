import H from 'history';
import {match} from 'react-router';

export type tStore = {
  usersByOrgId: tThunk<tUser[]>,
};

export type tState = {
  role: tRole,
};

export type tBaseProps = {
  match: match & {params: tGroupRouteParams},
  org: tGroup,
  role: tRole,
}

export type tContainerProps = tBaseProps & {
  deleteUserByOrgIdDispatch: (query: tDeleteUserByOrgIdQuery) =>
    tThunkPayload<{ok: true}>,
  isLoading: boolean,
  patchUserByOrgIdDispatch: (opts: tPatchUserRoleQuery) =>
    tThunkPayload<tUser>,
  router: H.Location,
  session: tSession,
  usersByOrgId: tUser[],
}

export type tComponentProps = tBaseProps & {
  removeUser: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  onRoleFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  section: string,
  setUserRole: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  users: tUser[],
  userTotal: number,
}
