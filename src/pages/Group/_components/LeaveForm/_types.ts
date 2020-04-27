export type tProps = {
  deleteUserByGroupIdDispatch: (query: ts.deleteUserByGroupIdQuery) => ts.thunkPayload<any>,
  dispatch: Function,
  group: ts.group,
  role: ts.role,
  session: ts.session,
};

export type tStore = {
  dispatch: Function,
};
