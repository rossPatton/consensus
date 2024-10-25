export type tProps = {
  dispatch: Function,
  group: ts.group,
  postNewUserByGroupIdDispatch: (query: ts.usersByGroupIdQuery) =>
    ts.thunkPayload<ts.user>,
  role: ts.role,
  session: ts.session,
};

export type tStore = {
  group: ts.thunk<ts.group>,
  session: ts.thunk<ts.session>,
  usersByGroupId: ts.thunk<ts.user[]>,
};
