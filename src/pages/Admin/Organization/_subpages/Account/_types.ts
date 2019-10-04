import {UPDATE_USER_SUCCESS} from '../../../../../redux/async/updateUser/_types';

export type tState = {
  isClient: boolean,
  login: string,
  newPassword: string,
  password: string,
  privateRSVP: boolean,
  privateMembership: boolean,
  privateProfile: boolean,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  authenticateSession: (login: tLogin) => any,
  session: tSession,
  // we get id from the active session
  updateUser: (account: {id: number} & tState) =>
    Promise<tAction<typeof UPDATE_USER_SUCCESS, tAccount>>,
};

export type tComponentProps = tState & {
  session: tSession,
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
