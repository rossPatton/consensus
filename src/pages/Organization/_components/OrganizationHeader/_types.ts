export type tComponentProps = {
  org: tOrg,
  params: tOrgRouteParams,
};

export type tContainerProps = tComponentProps & {
  getUsersByOrgIdDispatch: (query: tUsersByOrgIdQuery) => tThunkPayload<tUser[]>,
  isLoading: boolean,
};

export type tStore = {
  usersByOrg: tThunk<tUser[]>,
  session: tSession,
}
