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
  login: (login: tLoginQuery) => tThunkPayload<tSession>,
  session: tSession,
  // we get id from the active session
  patchUser: (user: tState & {id: number}) => tThunkPayload<tUser>,
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
