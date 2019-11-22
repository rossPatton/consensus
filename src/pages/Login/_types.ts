export type tProps = {
  authenticateSession: (arg: tLogin) => Promise<
    tAction<'AUTHENTICATE_USER_SUCCESS', tAccount>
  >,
  session: tSession,
};

export type tState = {
  isClient: boolean,
  password: string,
  username: string,
};

export type tStateUnion = keyof tState;

export interface tContainerProps extends tProps {
  getRoles: (query: tIdQuery) => any,
}

export interface tComponentProps extends tState {
  login: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
