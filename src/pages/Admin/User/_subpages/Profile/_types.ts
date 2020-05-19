import {History} from 'history';

export type tState = Partial<ts.user> & {
  city: string,
  cityId: number,
  password: string,
  region: string,
  regionId: number,
};
export type tKeyUnion = keyof tState;

export type tStore = {
  session: ts.thunk<ts.session>,
  uploads: ts.thunk<ts.upload>,
};

export type tContainerProps = {
  avatar?: string,
  history: History,
  loginDispatch: (login: ts.loginQuery) => ts.thunkPayload<ts.session>,
  match: ts.adminSectionParams,
  patchUserDispatch: (user: ts.userQuery) => ts.thunkPayload<ts.user>,
  sessionThunk: ts.thunk<ts.session<ts.user>>,
}

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: ts.session<ts.user>,
  subsection: string,
  updateState: (
    key: tKeyUnion,
    value: string | number | object | boolean,
  ) => void,
}
