export type tState = Partial<tUser> & {
  email: string, // email is part of account, but for ease of use we put it here
  password: string,
};

export type tStateUnion = keyof tState;

export type tStore = {
  session: tThunk<tSession>
};

export type tContainerProps = {
  loginDispatch: (login: tLoginQuery) => tThunkPayload<tSession>,
  patchUserDispatch: (user: tUserQuery) => tThunkPayload<tUser>,
  sessionThunk: tThunk<tSession>,
}

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: tSession,
  updateState: (
    key: tStateUnion,
    ev: React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void,
}
