export type tStore = {
  session: tThunk<tSession>,
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
  isClient: boolean,
  login: string,
  password: string,
};

export type tKeyUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (query: tLoginQuery) => tThunkPayload<tSession>,
  postUserDispatch: (query: tPostUserQuery) => tThunkPayload<tSession>,
};

export type tComponentProps = tContainerProps & tState & {
  errArr: string[],
  register: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
