export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tErrorObject = {
  email?: string[],
  password?: string[],
};

export type tPostUserQuery = {
  login: string,
  password: string,
};

export type tState = {
  errors: tErrorObject,
  hasMounted: boolean,
  login: string,
  password: string,
  username: string,
};

export type tKeyUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload<ts.session>,
  postUserDispatch: (query: tPostUserQuery) => ts.thunkPayload<ts.session>,
};

export type tComponentProps = tContainerProps & tState & {
  errArr: string[],
  register: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
