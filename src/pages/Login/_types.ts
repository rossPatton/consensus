export type tState = {
  error: string | ts.fetchResponse<Error>,
  password: string,
  username: string,
};

export type tStateUnion = keyof tState;

export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tContainerProps = tStore & {
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload<ts.roleMap>,
}

export type tComponentProps = tState & {
  error: string | ts.fetchResponse<Error>,
  onSubmit: (token: string) => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
