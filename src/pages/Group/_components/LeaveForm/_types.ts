export type tProps = {
  deleteUserByGroupIdDispatch: (query: tDeleteUserByGroupIdQuery) => tThunkPayload<any>,
  dispatch: Function,
  group: tGroup,
  role: ts.role,
  session: ts.session,
};

export type tStore = {
  dispatch: Function,
};
