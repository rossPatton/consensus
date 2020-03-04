export type tState = {
  isClient: boolean,
  login: string,
  password: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  deleteAccountDispatch: (query: tAccountQuery) => tThunkPayload<any>,
  logoutDispatch: () => tThunkPayload<any>,
};

export type tComponentProps = tState & {
  deleteAccount: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
