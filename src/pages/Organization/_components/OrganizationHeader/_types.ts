export type tComponentProps = {
  org: tOrg,
  usersByOrg: tUsersByOrg,
};

export type tContainerProps = tComponentProps & {
  getUsersByOrg: (query: tIdQuery) => Promise<tThunk<tUsersByOrg>>,
  isLoading: boolean,
};

export type tState = {
  usersByOrg: tThunk<tUsersByOrg>,
}
