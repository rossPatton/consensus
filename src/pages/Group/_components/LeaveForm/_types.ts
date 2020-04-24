export type tProps = {
  deleteUserByGroupIdDispatch: (query: tDeleteUserByGroupIdQuery) => tThunkPayload<any>,
  dispatch: Function,
  group: tGroup,
  role: tRole,
  session: tSession,
};

export type tStore = {
  dispatch: Function,
};
