export type tProps = {
  org: tOrg,
  postNewUserByOrg: (query: any) => Promise<tThunk<any>>,
  role: tRole,
  session: tSession,
  setRole: (query: {role: tRole}) => any,
  setUserByOrg: (query: any) => any,
};

export type tComponentProps = {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
};
