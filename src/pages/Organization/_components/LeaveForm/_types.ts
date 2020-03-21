export type tProps = {
  deleteUserByOrgIdDispatch: (query: tDeleteUserByOrgIdQuery) => tThunkPayload<any>,
  dispatch: Function,
  org: tGroup,
  role: tRole,
  session: tSession,
};

export type tStore = {
  dispatch: Function,
};
