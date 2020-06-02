import {History} from 'history';

export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tErrorObject = {
  email?: string[],
  password?: string[],
};

export type tState = {
  email: string,
  emailSent: boolean,
  error: string,
  token: string,
  username: string,
};

export type tKeyUnion = keyof tState;

export type tContainerProps = {
  history: History,
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload<ts.session>,
  postAccountDispatch: (query: {email: string}) => ts.thunkPayload<ts.account>,
  postUserDispatch: (query: ts.userQuery) => ts.thunkPayload<ts.session>,
};

export type tComponentProps = tContainerProps & tState & {
  verifyAndRegister: () => void,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
