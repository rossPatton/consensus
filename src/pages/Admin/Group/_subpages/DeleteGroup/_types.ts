export type tState = {
  hasMounted: boolean,
  currentPassword: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload<ts.session>,
  patchAccountDispatch: (query: ts.accountQuery) => ts.thunkPayload<ts.session>,
  session: ts.session,
};

export type tComponentProps = tState & {
  deleteGroup: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
  session: ts.session,
};