export type tStore = {
  session: tThunk<tSession>,
};

export type tForm = {
  email: string,
  fname: string,
  lname: string,
  password: string,
  username: string,
};

export type tState = tForm & {
  errors: string[],
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  authenticateSession: (arg: tLogin) => { payload: tUser },
  insertUser: (arg: tForm) => Promise<{ payload: tSession }>,
  session: tSession,
};

export type tComponentProps = tContainerProps & tState & {
  register: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
