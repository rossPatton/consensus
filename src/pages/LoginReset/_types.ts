import {History} from 'history';

export type tState = {
  email: string,
  hasMounted: boolean,
  login: string,
  password: string,
  passwordUpdated: boolean,
  token: string,
};

export type tStateUnion = keyof tState;

export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tContainerProps = tStore & {
  history: History,
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload<ts.roleMap>,
  match: ts.match & {
    params: { section: string }
  },
}

export type tComponentProps = tState & {
  resetLoginByEmail: (ev: React.FormEvent<HTMLFormElement>) => void,
  sendLoginResetEmail: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
