import {AUTHENTICATE_SUCCESS} from '../../../../../redux/async/session/_types';
import {UPDATE_USER_SUCCESS} from '../../../../../redux/async/updateUser/_types';

export type tState = {
  bio: string,
  email: string,
  name: string,
  newPassword: string,
  password: string,
  privateEmail: boolean,
  privateMemberships: boolean,
  privateName: boolean,
  privateRSVP: boolean,
  username: string,
};

export type tStateUnion = keyof tState;

export interface tContainerProps {
  authenticateSession: (login: tLogin) =>
    Promise<tAction<typeof AUTHENTICATE_SUCCESS, tLogin>>,
  session: tSession,
  // we get id from the active session
  updateUser: (user: {id: number} & tState) =>
    Promise<tAction<typeof UPDATE_USER_SUCCESS, tUser>>,
}

export interface tComponentProps extends tState {
  session: tSession,
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (
    key: tStateUnion,
    ev: React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void,
}
