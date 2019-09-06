export type tProps = {
  orgs: tOrg[],
};

export type tComponentProps = tProps & {
  onSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  leaveOrg: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
};

export type tContainerProps = tProps & {
  deleteUserByOrg: (query: {id: number}) => void,
  getOrgsByUser: () => void,
  session: tSession,
};

export type tState = {
  orgs: tOrg[],
};

export type tStore = {
  orgs: tThunk<tOrg[]>,
};
