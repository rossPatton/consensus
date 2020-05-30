export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tErrorObject = {
  email?: string[],
  password?: string[],
};

export type tPostUserQuery = {
  email: string,
  login: string,
  password: string,
  username: string,
};

export type tState = tPostUserQuery & {
  error: string,
};

export type tKeyUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload<ts.session>,
  postUserDispatch: (query: tPostUserQuery) => ts.thunkPayload<ts.session>,
};

export type tComponentProps = tContainerProps & tState & {
  register: () => void,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
