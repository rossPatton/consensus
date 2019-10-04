import {UPDATE_USER_SUCCESS} from '../../../../../redux/async/updateUser/_types';

export type tState = {
  email: string,
  isClient: boolean,
  fname: string,
  lname: string,
  newPassword: string,
  password: string,
  username: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  authenticateSession: (login: tLogin) => any,
  session: tSession,
  // we get id from the active session
  updateUser: (user: tUser) => Promise<tAction<typeof UPDATE_USER_SUCCESS, tUser>>,
};

export type tComponentProps = tState & {
  session: tSession,
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
