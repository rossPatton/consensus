export type tProps = {
  deleteUserByOrgIdDispatch: (query: tDeleteUserByOrgIdQuery) => tThunkPayload<any>,
  dispatch: Function,
  org: tOrg,
  role: tRole,
  session: tSession,
};

export type tStore = {
  dispatch: Function,
};
