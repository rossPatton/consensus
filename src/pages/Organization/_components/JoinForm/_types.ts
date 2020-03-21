export type tProps = {
  dispatch: Function,
  org: tGroup,
  postNewUserByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    tThunkPayload<tUser>,
  role: tRole,
  session: tSession,
};

export type tStore = {
  org: tThunk<tGroup>,
  session: tThunk<tSession>,
  usersByOrgId: tThunk<tUser[]>,
};
