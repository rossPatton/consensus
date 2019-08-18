export type tProps = {
  session: tSession,
  authenticateSession: (arg: tLogin) => tAction<'AUTHENTICATE_USER_SUCCESS', tUser>,
};

export type tState = {
  password: string,
  username: string,
};

export type tStateUnion = keyof tState;

export type tComponentProps = tState & {
  login: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
