import {History} from 'history';

export type tState = {
  error: string | ts.fetchResponse<Error>,
  // requireOtp: boolean,
  token: string,
};

export type tKeyUnion = keyof tState;

export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tContainerProps = tStore & {
  history: History,
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload<ts.session>,
  match: ts.match & { params: { type: 'user' | 'group', } },
};

export type tComponentProps = ts.tokenProps & tState & {
  error: string | ts.fetchResponse<Error>,
  verifyAndLogin: (email: string) => void,
  updateState: (stateKey: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
