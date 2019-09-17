export type tProps = {
  authenticateSession: (arg: tLogin) => tAction<'AUTHENTICATE_USER_SUCCESS', tUser>,
  session: tSession,
};

export type tState = {
  isClient: boolean,
  oLogin: string,
  oPassword: string,
  uLogin: string,
  uPassword: string,
};

export type tStateUnion = keyof tState;

export type tComponentProps = tState & {
  orgLogin: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
  userLogin: (ev: React.FormEvent<HTMLFormElement>) => void,
}
