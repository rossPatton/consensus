import { match } from 'react-router-dom';

export type tState = {
  email: string,
  isClient: boolean,
  login: string,
  password: string,
};

export type tStateUnion = keyof tState;

export type tStore = {
  session: tThunk<tSession>,
};

export type tContainerProps = tStore & {
  loginDispatch: (query: tLoginQuery) => tThunkPayload<tAccount>,
  match: match,
}

export type tComponentProps = tState & {
  resetPasswordByEmail: (event: React.FormEvent<HTMLFormElement>) => void,
  sendPasswordResetEmail: (event: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
