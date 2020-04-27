export type tState = {
  showMobileControls: number | null,
};

export type tRoleOpts = {
  groupId: number,
  role: ts.role,
  userId: number,
};

export type tProps = {
  count?: number,
  group: ts.group,
  sessionRole?: ts.role, // to distinguish from user roles, and to shut up eslint
  type?: string,
}

export type tContainerProps = tProps & {
  deleteUserByGroupIdDispatch: (query: ts.deleteUserByGroupIdQuery) =>
    ts.thunkPayload<{ok: true}>,
  getUsersByGroupIdDispatch: (query: ts.usersByGroupIdQuery) =>
    ts.thunkPayload<ts.user[]>,
  isLoading: boolean,
  patchUserByGroupIdDispatch: (opts: ts.patchUserRoleQuery) =>
    ts.thunkPayload<ts.user>,
  usersByGroupId: ts.user[],
}

export type tComponentProps = ts.mediaContext
  & tProps
  & tState
  & ts.searchFilterProps
  & ts.roleFilterProps
  & {
  isEditable: boolean,
  removeUser: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  setUserRole: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  toggleMobileControls: (index: number) => void,
  users: ts.user[],
};
