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
  loginDispatch: (login: ts.loginQuery) => tThunkPayload<ts.session>,
  match: ts.adminSectionParams,
  patchAccountDispatch: (query: ts.accountQuery) => tThunkPayload<ts.account>,
  sessionThunk: tThunk<ts.session>,
};

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => Promise<void>,
  session: ts.session,
  subsection: string,
  updateState: (key: tKeyUnion, value: string | boolean) => void,
};

export type tStore = {
  session: tThunk<ts.session>,
};
