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
  group: tGroup,
  sessionRole?: ts.role, // to distinguish from user roles, and to shut up eslint
  type?: string,
}

export type tContainerProps = tProps & {
  deleteUserByGroupIdDispatch: (query: tDeleteUserByGroupIdQuery) =>
    tThunkPayload<{ok: true}>,
  getUsersByGroupIdDispatch: (query: tUsersByGroupIdQuery) =>
    tThunkPayload<tUser[]>,
  isLoading: boolean,
  patchUserByGroupIdDispatch: (opts: tPatchUserRoleQuery) =>
    tThunkPayload<tUser>,
  usersByGroupId: tUser[],
}

export type tComponentProps = tMediaContext
  & tProps
  & tState
  & tSearchFilterProps
  & tRoleFilterProps
  & {
  isEditable: boolean,
  removeUser: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  setUserRole: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  toggleMobileControls: (index: number) => void,
  users: tUser[],
};
