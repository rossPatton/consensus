import {History} from 'history';

export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tState = {
  error: string,
  token: string,
  username: string,
};

export type tKeyUnion = keyof tState;

type tProps = ts.tokenProps & {
  termsAccepted: boolean,
  toggleTerms: (termsAccepted: boolean) => void,
};

export type tContainerProps = tProps & {
  history: History,
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload<ts.session>,
  postUserDispatch: (query: ts.userQuery) => ts.thunkPayload<ts.session>,
};

export type tComponentProps = tProps & tState & {
  verifyAndRegister: () => void,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
