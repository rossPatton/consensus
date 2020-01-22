export type tStore = {
  session: tThunk<tSession>,
};

export type tForm = {
  email: string,
  login: string,
  password: string,
  username: string,
};

export type tErrorObject = {
  email?: string[],
  password?: string[],
};

export type tState = tForm & {
  isClient: boolean,
  errors: tErrorObject,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  authenticateSession: (query: tLogin) => tThunkReturn<tSession>,
  registerUser: (arg: tForm) => tThunkReturn<tSession>,
};

export type tComponentProps = tContainerProps & tState & {
  disabled: boolean,
  errArr: string[],
  register: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
