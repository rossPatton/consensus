export type tStore = {
  session: tThunk<tSession>,
};

export type tErrorObject = {
  email?: string[],
  password?: string[],
};

export type tState = tUserSignupForm & {
  isClient: boolean,
  errors: tErrorObject,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  authenticateSession: (query: tLoginQuery) => tThunkPayload<tSession>,
  postUser: (arg: tUserSignupForm) => tThunkPayload<tSession>,
};

export type tComponentProps = tContainerProps & tState & {
  disabled: boolean,
  errArr: string[],
  register: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
