export type tProps = {
  role: tRole,
  usersByOrg: tUsersByOrg,
};

export type tContainerProps = tProps & {
  getUsersByOrg: (query: tIdQuery) => Promise<tThunk<tUsersByOrg>>,
  org: tOrg,
};
