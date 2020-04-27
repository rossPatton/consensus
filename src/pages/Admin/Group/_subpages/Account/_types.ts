export type tState = {
  currentPassword: string,
  email: string,
  isVerified: boolean,
  login: string,
  newPassword: string,
};

export type tKeyUnion = keyof tState;
export type tStore = {session: tThunk<ts.session>};

export type tContainerProps = {
  loginDispatch: (login: ts.loginQuery) => tThunkPayload<ts.session>,
  match: ts.adminSectionParams,
  patchAccountDispatch: (query: ts.accountQuery) => tThunkPayload<ts.account>,
  sessionThunk: tThunk<ts.session>,
};

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: ts.session,
  subsection: string,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
