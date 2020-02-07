export type tProps = {
  dispatch: Function,
  orgId: number,
  postNewUserByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    tThunkPayload<tUser>,
  role: tRole,
  session: tSession,
};

export type tComponentProps = {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
};

export type tStore = {
  dispatch: Function,
  usersByOrg: tThunk<tUser[]>,
}
