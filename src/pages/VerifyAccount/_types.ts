import {History} from 'history';
import {match} from 'react-router-dom';

export type tState = {
  email: string,
  hasMounted: boolean,
  login: string,
  password: string,
  token: string,
};

export type tStateUnion = keyof tState;

export type tStore = {
  session: tThunk<tSession>,
};

export type tContainerProps = tStore & {
  history: History,
  loginDispatch: (query: tLoginQuery) => tThunkPayload<tAccount>,
  match: match,
};
