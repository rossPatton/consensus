

export type tStore = {
  usersByGroupId: ts.thunk<ts.user[]>,
};

type tProps = {
  group: ts.group,
  role: ts.role,
};

export type tContainerProps = tProps & {
  match: ts.match & {params: ts.groupRouteParams},
  usersThunk: ts.thunk<ts.user[]>,
};

export type tComponentProps = tProps & {
  section: string,
};
