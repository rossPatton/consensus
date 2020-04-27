import {History} from 'history';

export type tStore = {
  groupsByUserId: tThunk<tGroup[]>,
  roles: tThunk<ts.roleMap[]>,
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<ts.session<tUser>>,
};

export type tProps = {
  history: History,
  match: ts.adminSectionParams,
  groupsByUserIdThunk: tThunk<tGroup[]>,
  session: ts.session<tUser>,
};

export type tComponentProps = tProps & {
  isDesktop: boolean,
  isMobile: boolean,
  roles: ts.roleMap[],
};

export type tContainerProps = tProps & {
  getGroupsByUserIdDispatch: (query: tGroupsByUserIdQuery) => tThunkPayload<tGroup[]>,
  getRolesDispatch: () => tThunkPayload<ts.roleMap[]>,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  logoutDispatch: () => tThunkPayload<ts.isAuthenticated>,
  isLoading: boolean,
  rolesThunk: tThunk<ts.roleMap[]>,
  rsvpsThunk: tThunk<tRSVP[]>,
  session: ts.session,
};
