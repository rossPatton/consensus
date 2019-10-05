import {UPDATE_USER_SUCCESS} from '../../../../../redux/async/updateUser/_types';

export type tState = {
  bio: string,
  email: string,
  fname: string,
  lname: string,
  newPassword: string,
  password: string,
  privateEmail: boolean,
  privateMemberships: boolean,
  privateRSVP: boolean,
  username: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  authenticateSession: (login: tLogin) => any,
  session: tSession,
  // we get id from the active session
  updateUser: (user: {id: number} & tState) =>
    Promise<tAction<typeof UPDATE_USER_SUCCESS, tUser>>,
};

export type tComponentProps = tState & {
  session: tSession,
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (
    key: tStateUnion,
    ev: React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void,
};
