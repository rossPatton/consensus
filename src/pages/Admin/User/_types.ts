import {tAdminSections} from '../_types';

export type tStore = {
  roles: tThunk<tRoleMap[]>,
  rsvps: tThunk<tRSVP[]>,
};

export type tProps = {
  match: tAdminSections,
};

export type tContainerProps = tProps & {
  getRolesDispatch: () => tThunkPayload<tRoleMap[]>,
  getRsvpsDispatch: () => tThunkPayload<tRSVP[]>,
  isLoading: boolean,
};
