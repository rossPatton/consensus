export type tStateUnion = keyof tOrg;
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tStore = {
  session: tThunk<tSession>,
}

export type tContainerProps = {
  patchOrgDispatch: (query: tOrgQuery) => tThunkPayload<tOrg>,
  sessionThunk: tThunk<tSession>,
};

export type tComponentProps = tOrg & {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => void,
};
