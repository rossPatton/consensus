import {History} from 'history';

export type tStore = {
  groupsByUserId: ts.thunk<ts.group[]>,
  roles: ts.thunk<ts.roleMap[]>,
  rsvps: ts.thunk<ts.rsvp[]>,
  session: ts.thunk<ts.session<ts.user>>,
};

export type tProps = {
  history: History,
  match: ts.adminSectionParams,
  groupsByUserIdThunk: ts.thunk<ts.group[]>,
  session: ts.session<ts.user>,
};

export type tComponentProps = tProps & {
  isDesktop: boolean,
  isMobile: boolean,
  roles: ts.roleMap[],
};

export type tContainerProps = tProps & {
  getGroupsByUserIdDispatch: (query: ts.groupsByUserIdQuery) => ts.thunkPayload<ts.group[]>,
  getRolesDispatch: () => ts.thunkPayload<ts.roleMap[]>,
  getRsvpsDispatch: () => ts.thunkPayload<ts.rsvp[]>,
  logoutDispatch: () => ts.thunkPayload<ts.isAuthenticated>,
  isLoading: boolean,
  rolesThunk: ts.thunk<ts.roleMap[]>,
  rsvpsThunk: ts.thunk<ts.rsvp[]>,
  session: ts.session,
};
