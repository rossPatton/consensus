export type tState = {
  showMobileControls: number | null,
};

export type tRoleOpts = {
  orgId: number,
  role: tRole,
  userId: number,
};

export type tProps = {
  count?: number,
  group: tGroup,
  sessionRole?: tRole, // to distinguish from user roles, and to shut up eslint
  type?: string,
}

export type tContainerProps = tProps & {
  deleteUserByOrgIdDispatch: (query: tDeleteUserByOrgIdQuery) =>
    tThunkPayload<{ok: true}>,
  getUsersByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    tThunkPayload<tUser[]>,
  isLoading: boolean,
  patchUserByOrgIdDispatch: (opts: tPatchUserRoleQuery) =>
    tThunkPayload<tUser>,
  usersByOrgId: tUser[],
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
