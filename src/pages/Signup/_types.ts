export type tStore = {
  session: tThunk<tSession>,
};

export type tForm = {
  email: string,
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
  authenticateSession: (arg: tLogin) => { payload: tUser },
  registerUser: (arg: tForm) => Promise<{ payload: tSession }>,
  session: tSession,
};

export type tComponentProps = tContainerProps & tState & {
  disabled: boolean,
  errArr: string[],
  register: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
