export type tComponentProps = {
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  groups: tGroup[],
  roles: tRoleMap[],
};

export type tContainerProps = {
  getGroupsByUserIdDispatch: (query: tGroupsByUserIdQuery) => tThunkPayload<tGroup[]>,
  groupsByUserIdThunk: tThunk<tGroup[]>,
  roles: tRoleMap[],
  sessionThunk: tThunk<tSession>,
};

export type tStore = {
  groupsByUserId: tThunk<tGroup[]>,
  roles: tThunk<tRoleMap[]>,
  session: tThunk<tSession>,
};
