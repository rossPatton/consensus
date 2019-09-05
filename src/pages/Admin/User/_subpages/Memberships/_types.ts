export type tProps = {
  orgs: tOrg[],
};

export type tContainerProps = tProps & {
  getOrgsByUser: () => void,
  session: tSession,
};

export type tStore = {
  orgs: tThunk<tOrg[]>,
};
