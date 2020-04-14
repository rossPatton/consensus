import {tAdminSections} from '../../../_types';

export type tStore = {
  usersByOrgId: tThunk<tUser[]>,
};

export type tContainerProps = {
  group: tGroup,
  match: tAdminSections,
  usersThunk: tThunk<tUser[]>,
};
