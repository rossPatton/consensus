export type tState = tOrg & {
  email: string,
  isLocked: boolean,
  password: string,
}

export type tStateUnion = keyof tState;
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tStore = {
  session: tThunk<tSession>,
}

export type tContainerProps = {
  loginDispatch: (query: tLoginQuery) => tThunkPayload,
  patchOrgDispatch: (query: tOrgQuery) => tThunkPayload<tOrg>,
  sessionThunk: tThunk<tSession>,
};

export type tComponentProps = tState & {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  toggleLock: () => void,
  session: tSession,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => void,
};
