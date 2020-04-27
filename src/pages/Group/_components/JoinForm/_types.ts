export type tProps = {
  dispatch: Function,
  group: tGroup,
  postNewUserByGroupIdDispatch: (query: tUsersByGroupIdQuery) =>
    tThunkPayload<tUser>,
  role: ts.role,
  session: ts.session,
};

export type tStore = {
  group: tThunk<tGroup>,
  session: tThunk<ts.session>,
  usersByGroupId: tThunk<tUser[]>,
};
