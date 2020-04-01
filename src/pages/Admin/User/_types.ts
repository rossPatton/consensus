import {History} from 'history';

import {tAdminSections} from '../_types';

export type tStore = {
  orgsByUserId: tThunk<tGroup[]>,
  roles: tThunk<tRoleMap[]>,
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<tSession<tUser>>,
};

export type tProps = {
  history: History,
  match: tAdminSections,
  orgsByUserIdThunk: tThunk<tGroup[]>,
  session: tSession<tUser>,
};

export type tComponentProps = tProps & {
  roles: tRoleMap[],
};

export type tContainerProps = tProps & {
  getGroupsByUserIdDispatch: (query: tGroupsByUserIdQuery) => tThunkPayload<tGroup[]>,
  getRolesDispatch: () => tThunkPayload<tRoleMap[]>,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  logoutDispatch: () => tThunkPayload<any>,
  isLoading: boolean,
  rolesThunk: tThunk<tRoleMap[]>,
  rsvpsThunk: tThunk<tRSVP[]>,
  session: tSession,
};
