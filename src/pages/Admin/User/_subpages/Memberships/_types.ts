export type tComponentProps = {
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  orgs: tGroup[],
  roles: tRoleMap[],
};

export type tContainerProps = {
  getGroupsByUserIdDispatch: (query: tGroupsByUserIdQuery) => tThunkPayload<tGroup[]>,
  orgsByUserIdThunk: tThunk<tGroup[]>,
  roles: tRoleMap[],
  sessionThunk: tThunk<tSession>,
};

export type tStore = {
  orgsByUserId: tThunk<tGroup[]>,
  roles: tThunk<tRoleMap[]>,
  session: tThunk<tSession>,
};
