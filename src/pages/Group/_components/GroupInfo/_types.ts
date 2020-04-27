

export type tProps = {
  match: ts.match & {params: ts.groupRouteParams},
  group: ts.group,
  params: ts.groupRouteParams,
  role: ts.role,
};

export type tComponentProps = tProps & {
  members: ts.user[],
};

export type tContainerProps = tProps & {
  getUsersByGroupIdDispatch: (query: ts.usersByGroupIdQuery) => ts.thunkPayload<ts.user[]>,
  isLoading: boolean,
  usersByGroupId: ts.user[],
};

export type tStore = {
  usersByGroupId: ts.thunk<ts.user[]>,
};
