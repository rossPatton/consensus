export type tStateUnion = keyof tOrg;
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  patchOrg: (query: tOrgQuery) => tThunkPayload<tOrg>,
  session: tSession,
};

export type tComponentProps = tOrg & {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => void,
};
