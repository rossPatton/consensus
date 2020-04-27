export type tState = {
  hasMounted: boolean,
  password: string,
  username: string,
};

export type tStateUnion = keyof tState;

export type tStore = {
  session: tThunk<ts.session>,
};

export type tContainerProps = tStore & {
  loginDispatch: (query: ts.loginQuery) => tThunkPayload<ts.roleMap>,
}

export type tComponentProps = tState & {
  error: string,
  login: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
