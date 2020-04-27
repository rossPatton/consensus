export type tStore = {
  usersByGroupId: ts.thunk<ts.user[]>,
};

export type tContainerProps = {
  group: ts.group,
  match: ts.adminSectionParams,
  usersThunk: ts.thunk<ts.user[]>,
};
