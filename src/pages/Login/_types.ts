export type tProps = {
  authenticateSession: (arg: tLogin) => tAction<'AUTHENTICATE_USER_SUCCESS', tUser>,
  session: tSession,
};

export type tState = {
  isClient: boolean,
  oEmail: string,
  oPassword: string,
  uEmail: string,
  uPassword: string,
};

export type tStateUnion = keyof tState;

export type tComponentProps = tState & {
  login: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
