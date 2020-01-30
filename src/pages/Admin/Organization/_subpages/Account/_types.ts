export type tState = {
  isVerified: boolean,
  login: string,
  newPassword: string,
  password: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (query: tLoginQuery) => tThunkPayload,
  patchAccountDispatch: (query: tAccount) => tThunkPayload,
  sessionThunk: tThunk<tSession>,
};

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: tSession,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};

export type tStore = {
  session: tThunk<tSession>,
};
