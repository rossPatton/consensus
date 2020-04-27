export type tComponentProps = {
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  groups: tGroup[],
  roles: ts.roleMap[],
};

export type tContainerProps = {
  getGroupsByUserIdDispatch: (query: tGroupsByUserIdQuery) => tThunkPayload<tGroup[]>,
  groupsByUserIdThunk: tThunk<tGroup[]>,
  roles: ts.roleMap[],
  sessionThunk: tThunk<ts.session>,
};

export type tStore = {
  groupsByUserId: tThunk<tGroup[]>,
  roles: tThunk<ts.roleMap[]>,
  session: tThunk<ts.session>,
};
