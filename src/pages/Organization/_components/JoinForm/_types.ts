export type tProps = {
  dispatch: Function,
  org: tOrg,
  postNewUserByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    tThunkPayload<tUser>,
  role: tRole,
  session: tSession,
};

export type tComponentProps = {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  org: tOrg,
};

export type tStore = {
  dispatch: Function,
  org: tThunk<tOrg>,
  session: tThunk<tSession>,
  usersByOrgId: tThunk<tUser[]>,
}
