import {History} from 'history';

import {tAdminSections} from '../../../_types';

export type tState = Partial<tUser> & {
  avatarEmail: string,
  city: string,
  cityId: number,
  password: string,
  region: string,
  regionId: number,
};
export type tStore = {session: tThunk<tSession>};
export type tKeyUnion = keyof tState;

export type tContainerProps = {
  history: History,
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
    value: string | number | object | boolean,
  ) => void,
}
