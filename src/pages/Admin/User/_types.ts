import {tAdminSections} from '../_types';

export type tStore = {
  orgsByUserId: tThunk<tOrg[]>,
  roles: tThunk<tRoleMap[]>,
  rsvps: tThunk<tRSVP[]>,
  session: tThunk<tSession<tUser>>,
};

export type tProps = {
  match: tAdminSections,
  orgsByUserIdThunk: tThunk<tOrg[]>,
  session: tSession<tUser>,
};

export type tComponentProps = tProps & {
  roles: tRoleMap[],
};

export type tContainerProps = tProps & {
  getOrgsByUserIdDispatch: (query: tOrgsByUserIdQuery) => tThunkPayload<tOrg[]>,
  getRolesDispatch: () => tThunkPayload<tRoleMap[]>,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  logoutDispatch: () => tThunkPayload<any>,
  isLoading: boolean,
  rolesThunk: tThunk<tRoleMap[]>,
  rsvpsThunk: tThunk<tRSVP[]>,
  session: tSession,
};
