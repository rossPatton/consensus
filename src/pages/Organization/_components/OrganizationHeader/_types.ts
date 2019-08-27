export type tComponentProps = {
  org: tOrg,
  params: tOrgRouteParams,
};

export type tContainerProps = tComponentProps & {
  getUsersByOrg: (query: tIdQuery) => Promise<tThunk<tUsersByOrg>>,
  isLoading: boolean,
};

export type tStore = {
  usersByOrg: tThunk<tUsersByOrg>,
  session: tSession,
}
