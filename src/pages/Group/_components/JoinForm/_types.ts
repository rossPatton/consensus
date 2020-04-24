export type tProps = {
  dispatch: Function,
  group: tGroup,
  postNewUserByGroupIdDispatch: (query: tUsersByGroupIdQuery) =>
    tThunkPayload<tUser>,
  role: tRole,
  session: tSession,
};

export type tStore = {
  group: tThunk<tGroup>,
  session: tThunk<tSession>,
  usersByGroupId: tThunk<tUser[]>,
};
