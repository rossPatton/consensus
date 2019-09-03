export type tProps = {
  orgs: tOrg[],
};

export type tContainerProps = tProps & {
  getOrgsByUser: () => void,
  session: tSession,
};
