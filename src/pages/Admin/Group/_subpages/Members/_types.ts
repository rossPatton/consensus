import {tAdminSections} from '../../../_types';

export type tStore = {
  usersByGroupId: tThunk<tUser[]>,
};

export type tContainerProps = {
  group: tGroup,
  match: tAdminSections,
  usersThunk: tThunk<tUser[]>,
};
