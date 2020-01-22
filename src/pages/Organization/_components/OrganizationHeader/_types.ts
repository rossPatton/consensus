export type tComponentProps = {
  org: tOrg,
  params: tOrgRouteParams,
};

export type tContainerProps = tComponentProps & {
  getUsersByOrg: (query: tIdQueryC) => Promise<tThunk<tUsersByOrg>>,
  isLoading: boolean,
};

export type tStore = {
  usersByOrg: tThunk<tUsersByOrg>,
  session: tSession,
}
