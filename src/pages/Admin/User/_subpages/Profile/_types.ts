export type tState = {
  bio: string,
  city?: number,
  email: string,
  name: string,
  password: string,
  postcode?: number,
  privateEmail: boolean,
  privateLocation: boolean,
  privateMemberships: boolean,
  privatePhone: boolean,
  privateRSVP: boolean,
  username: string,
};

export type tStateUnion = keyof tState;

export type tStore = {
  session: tThunk<tSession>
};

export type tContainerProps = {
  loginDispatch: (login: tLoginQuery) => tThunkPayload<tSession>,
  patchUserDispatch: (user: tPatchUserQuery) => tThunkPayload<tUser>,
  sessionThunk: tThunk<tSession>,
}

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: tSession,
  updateState: (
    key: tStateUnion,
    ev: React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void,
}
