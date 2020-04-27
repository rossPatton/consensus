export type tState = {
  hasMounted: boolean,
  currentPassword: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (query: ts.loginQuery) => tThunkPayload<ts.session>,
  patchAccountDispatch: (query: ts.accountQuery) => tThunkPayload<ts.session>,
  sessionThunk: tThunk<ts.session>,
};

export type tComponentProps = tState & {
  deleteGroup: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
  session: ts.session,
};
