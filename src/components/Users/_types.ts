export type tState = {
  allSelected: boolean,
  showMobileControls: number | null,
};

export type tProps = {
  checked: {[key: number]: boolean},
  className: string,
  count?: number,
  isEditable?: boolean,
  isSelectable?: boolean,
  group: ts.group,
  sessionRole?: ts.role, // to distinguish from user roles, and to shut up eslint
  type?: string,
};

export type tStore = {
  checked: {[key: number]: boolean},
  usersByGroupId: ts.thunk<ts.user[]>,
};

export type tContainerProps = tProps & {
  dispatch: Function,
  deleteUserByGroupIdDispatch: (query: ts.deleteUserByGroupIdQuery) =>
    ts.thunkPayload<{ok: true}>,
  getUsersByGroupIdDispatch: (query: ts.usersByGroupIdQuery) =>
    ts.thunkPayload<ts.user[]>,
  patchUserByGroupIdDispatch: (opts: ts.patchUserRoleQuery) =>
    ts.thunkPayload<ts.user>,
  usersByGroupIdThunk: ts.thunk<ts.user[]>,
}

export type tComponentProps = tProps
  & tState
  & Partial<ts.searchFilterProps>
  & Partial<ts.roleFilterProps>
  & {
  isEditable: boolean,
  removeUser: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  setUserRole: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  toggleAll: (users: ts.user[]) => void,
  toggleMobileControls: (index: number) => void,
  toggleCheck: (id: number) => void,
  users: ts.user[],
};
