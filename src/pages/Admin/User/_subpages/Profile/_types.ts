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
  login: (login: tLogin) => tThunkReturn<tSession>,
  session: tSession,
  // we get id from the active session
  updateUser: (user: tState & {id: number}) => tThunkReturn<tUser>,
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
