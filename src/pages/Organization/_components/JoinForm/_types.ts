export type tProps = {
  dispatch: Function,
  org: tOrg,
  postNewUserByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    tThunkPayload<tUser>,
  role: tRole,
  session: tSession,
};

export type tStore = {
  org: tThunk<tOrg>,
  session: tThunk<tSession>,
  usersByOrgId: tThunk<tUser[]>,
};
