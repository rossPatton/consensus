export type tProps = {
  login: (query: tLogin) => tThunkReturn<tAccount>,
  session: tSession,
};

export type tState = {
  isClient: boolean,
  password: string,
  username: string,
};

export type tStateUnion = keyof tState;

export interface tContainerProps extends tProps {
  getRoles: () => tThunkReturn<tRole[]>,
}

export interface tComponentProps extends tState {
  login: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
