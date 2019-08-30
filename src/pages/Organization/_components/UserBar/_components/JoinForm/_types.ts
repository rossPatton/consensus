export type tProps = {
  org: tOrg,
  role: tRole,
  session: tSession,
};

export type tComponentProps = {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
};
