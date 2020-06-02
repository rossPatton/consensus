import {History} from 'history';

export type tState = {
  email: string,
  emailSent: boolean,
  error: string | ts.fetchResponse<Error>,
  token: string,
  type: 'user' | 'group',
};

export type tKeyUnion = keyof tState;

export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tContainerProps = tStore & {
  history: History,
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload<ts.roleMap>,
}

export type tComponentProps = tState & {
  error: string | ts.fetchResponse<Error>,
  onSubmit: (token: string) => void,
  updateState: (stateKey: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
