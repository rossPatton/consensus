export type tComponentProps = {
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  orgs: tOrg[],
  roles: tRoleMap[],
};

export type tContainerProps = {
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
