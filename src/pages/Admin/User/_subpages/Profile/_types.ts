import {tAdminSections} from '../../../_types';

export type tState = Partial<tUser> & {password: string};
export type tStore = {session: tThunk<tSession>};
export type tKeyUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (login: tLoginQuery) => tThunkPayload<tSession>,
  match: tAdminSections,
  patchUserDispatch: (user: tUserQuery) => tThunkPayload<tUser>,
  sessionThunk: tThunk<tSession>,
}

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: tSession,
  subsection: string,
  updateState: (
    key: tKeyUnion,
    ev: React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void,
}
