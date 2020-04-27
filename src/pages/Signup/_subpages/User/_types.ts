export type tStore = {
  session: tThunk<ts.session>,
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
};

export type tKeyUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (query: ts.loginQuery) => tThunkPayload<ts.session>,
  postUserDispatch: (query: tPostUserQuery) => tThunkPayload<ts.session>,
};

export type tComponentProps = tContainerProps & tState & {
  errArr: string[],
  register: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
