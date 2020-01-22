export type tProps = {
  orgId: number,
  postNewUserByOrg: (query: tIdQueryC) => tThunkReturn<tUser>,
  role: tRole,
  session: tSession,
  setRole: (query: {role: tRole}) => tThunkReturn<tRole>,
  setUserByOrg: (query: tUser) => tUser,
};

export type tComponentProps = {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
};

export type tStore = {
  usersByOrg: tThunk<tUser[]>,
}
