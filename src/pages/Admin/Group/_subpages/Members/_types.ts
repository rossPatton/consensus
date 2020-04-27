export type tStore = {
  usersByGroupId: tThunk<tUser[]>,
};

export type tContainerProps = {
  group: tGroup,
  match: ts.adminSectionParams,
  usersThunk: tThunk<tUser[]>,
};
