export type tComponentProps = {
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  groups: ts.group[],
  roles: ts.roleMap[],
};

export type tContainerProps = {
  getGroupsByUserIdDispatch: (query: ts.groupsByUserIdQuery) => ts.thunkPayload<ts.group[]>,
  groupsByUserIdThunk: ts.thunk<ts.group[]>,
  roles: ts.roleMap[],
  sessionThunk: ts.thunk<ts.session>,
};

export type tStore = {
  groupsByUserId: ts.thunk<ts.group[]>,
  roles: ts.thunk<ts.roleMap[]>,
  session: ts.thunk<ts.session>,
};
