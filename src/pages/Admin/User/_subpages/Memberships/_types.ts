export type tComponentProps = {
  leaveOrg: (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  orgs: tOrg[],
  roles: tRoleMap[],
};

export type tContainerProps = {
  deleteOrgByUserIdDispatch: (query: tDeleteUserByOrgIdQuery) => tThunkPayload<tOrg>,
  getOrgsByUserIdDispatch: (query: tOrgsByUserIdQuery) => tThunkPayload<tOrg[]>,
  orgsByUserIdThunk: tThunk<tOrg[]>,
  roles: tRoleMap[],
  sessionThunk: tThunk<tSession>,
};

export type tStore = {
  orgsByUserId: tThunk<tOrg[]>,
  roles: tThunk<tRoleMap[]>,
  session: tThunk<tSession>,
};
