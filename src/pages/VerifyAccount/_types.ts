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
  session: tThunk<ts.session>,
};

export type tContainerProps = tStore & {
  history: History,
  loginDispatch: (query: ts.loginQuery) => tThunkPayload<ts.roleMap>,
  match: match,
};
