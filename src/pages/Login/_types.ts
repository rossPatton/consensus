import {History} from 'history';

export type tState = {
  error: string | ts.fetchResponse<Error>,
  sessionType: 'user' | 'group',
  token: string,
};

export type tKeyUnion = keyof tState;

export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tContainerProps = tStore & {
  history: History,
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload<ts.roleMap>,
};

export type tComponentProps = tState & {
  email: string,
  error: string | ts.fetchResponse<Error>,
  verifyAndLogin: (email: string) => void,
  updateState: (stateKey: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
