import {History} from 'history';

export type tState = {
  email: string,
  hasMounted: boolean,
  login: string,
  password: string,
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
};
