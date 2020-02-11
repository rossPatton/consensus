// TODO leftovers from before role de-coupling, eventually remove
export type tOrgWithRole = tOrg & {role: tRole};

export type tState = {
  orgs: tOrgWithRole[],
};

export type tComponentProps = {
  leaveOrg: (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => void,
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  orgs: tOrgWithRole[],
};

export type tContainerProps = {
  deleteOrgByUserIdDispatch: (query: tDeleteUserByOrgIdQuery) => tThunkPayload<tOrg>,
  getOrgsByUserIdDispatch: (query: tOrgsByUserIdQuery) => tThunkPayload<tOrg[]>,
  orgsByUserIdThunk: tThunk<tOrgWithRole[]>,
  sessionThunk: tThunk<tSession>,
};

export type tStore = {
  orgsByUserId: tThunk<tOrgWithRole[]>,
  session: tThunk<tSession>,
};
