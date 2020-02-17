export type tProps = {
  org: tOrg,
  params: tOrgRouteParams,
  role: tRole,
};

export type tComponentProps = tProps & {
  members: tUser[],
};

export type tContainerProps = tProps & {
  getUsersByOrgIdDispatch: (query: tUsersByOrgIdQuery) => tThunkPayload<tUser[]>,
  isLoading: boolean,
  usersByOrgId: tUser[],
};

export type tStore = {
  usersByOrgId: tThunk<tUser[]>,
};
