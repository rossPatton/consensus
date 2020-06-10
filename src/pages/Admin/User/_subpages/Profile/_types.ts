export type tState = Partial<ts.user> & {
  city: string,
  cityId: number,
  region: string,
  regionId: number,
  error: string,
};

export type tKeyUnion = keyof tState;

export type tStore = {
  session: ts.thunk<ts.session>,
  uploads: ts.thunk<ts.upload>,
};

export type tContainerProps = {
  avatar?: string,
  dispatch: Function,
  match: ts.adminSectionParams,
  patchUserDispatch: (user: ts.userQuery) => ts.thunkPayload<ts.user>,
  sessionThunk: ts.thunk<ts.session<ts.user>>,
}

export type tComponentProps = tState & {
  save: () => void,
  session: ts.session<ts.user>,
  subsection: string,
  updateState: (
    key: tKeyUnion,
    value: string | number | object | boolean,
  ) => void,
}
