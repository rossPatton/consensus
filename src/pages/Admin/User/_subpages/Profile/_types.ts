import {tAdminSections} from '../../../_types';

export type tState = Partial<tUser> & {
  city: string,
  cityId: number | null,
  password: string,
  region: string,
  regionId: number | null,
};
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
    value: string | number | object | boolean,
  ) => void,
}
