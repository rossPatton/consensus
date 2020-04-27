import {History} from 'history';

export type tState = Partial<tUser> & {
  avatarEmail: string,
  city: string,
  cityId: number,
  password: string,
  region: string,
  regionId: number,
};
export type tStore = {session: tThunk<ts.session>};
export type tKeyUnion = keyof tState;

export type tContainerProps = {
  history: History,
  loginDispatch: (login: ts.loginQuery) => tThunkPayload<ts.session>,
  match: ts.adminSectionParams,
  patchUserDispatch: (user: tUserQuery) => tThunkPayload<tUser>,
  sessionThunk: tThunk<ts.session>,
}

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: ts.session,
  subsection: string,
  updateState: (
    key: tKeyUnion,
    value: string | number | object | boolean,
  ) => void,
}
