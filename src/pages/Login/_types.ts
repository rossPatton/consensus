export type tState = {
  hasMounted: boolean,
  password: string,
  username: string,
};

export type tStateUnion = keyof tState;

export type tStore = {
  session: tThunk<tSession>,
};

export type tContainerProps = tStore & {
  loginDispatch: (query: tLoginQuery) => tThunkPayload<tAccount>,
}

export type tComponentProps = tState & {
  error: string,
  login: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
