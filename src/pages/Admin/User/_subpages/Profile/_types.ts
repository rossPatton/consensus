import {History} from 'history';

export type tState = Partial<ts.user> & {
  avatarEmail: string,
  city: string,
  cityId: number,
  password: string,
  region: string,
  regionId: number,
  userAvatar: string | null,
};
export type tStore = {session: ts.thunk<ts.session>};
export type tKeyUnion = keyof tState;

export type tContainerProps = {
  history: History,
  loginDispatch: (login: ts.loginQuery) => ts.thunkPayload<ts.session>,
  match: ts.adminSectionParams,
  patchUserDispatch: (user: ts.userQuery) => ts.thunkPayload<ts.user>,
  sessionThunk: ts.thunk<ts.session<ts.user>>,
}

export type tComponentProps = tState & {
  removeAvatar: any,
  setAvatar: any,
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: ts.session<ts.user>,
  subsection: string,
  updateState: (
    key: tKeyUnion,
    value: string | number | object | boolean,
  ) => void,
}
