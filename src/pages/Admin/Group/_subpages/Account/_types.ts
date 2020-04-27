export type tState = {
  currentPassword: string,
  email: string,
  isVerified: boolean,
  login: string,
  newPassword: string,
};

export type tKeyUnion = keyof tState;
export type tStore = {session: ts.thunk<ts.session>};

export type tContainerProps = {
  loginDispatch: (login: ts.loginQuery) => ts.thunkPayload<ts.session>,
  match: ts.adminSectionParams,
  patchAccountDispatch: (query: ts.accountQuery) => ts.thunkPayload<ts.account>,
  sessionThunk: ts.thunk<ts.session>,
};

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: ts.session,
  subsection: string,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
