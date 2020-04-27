export type tState = {
  hasMounted: boolean,
  currentPassword: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  deleteAccountDispatch: (query: ts.accountQuery) => ts.thunkPayload<ts.roleMap>,
  logoutDispatch: () => ts.thunkPayload<any>,
};

export type tComponentProps = tState & {
  deleteAccount: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
