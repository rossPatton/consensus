import {History} from 'history';

export type tState = {
  currentPassword: string,
  email: string,
  isVerified: boolean,
  login: string,
  newPassword: string,
  privateEmail: boolean,
};

export type tKeyUnion = keyof tState;

export type tContainerProps = {
  history: History,
  loginDispatch: (login: ts.loginQuery) => ts.thunkPayload<ts.session>,
  match: ts.adminSectionParams,
  patchAccountDispatch: (query: ts.accountQuery) => ts.thunkPayload<ts.account>,
  sessionThunk: ts.thunk<ts.session>,
};

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => Promise<void>,
  session: ts.session,
  subsection: string,
  updateState: (key: tKeyUnion, value: string | boolean) => void,
};

export type tStore = {
  session: ts.thunk<ts.session>,
};
