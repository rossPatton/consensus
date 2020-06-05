export type tState = {
  disableOtp: boolean,
  error: string,
  otpSecret?: string,
  token: string,
};
export type tKeyUnion = keyof tState;

export type tStore = {
  session: ts.thunk<ts.session>,
};

export type tContainerProps = {
  loginDispatch: (login: ts.loginQuery) => ts.thunkPayload<ts.session>,
  patchUserDispatch: (user: ts.userQuery) => ts.thunkPayload<ts.user>,
  sessionThunk: ts.thunk<ts.session<ts.user>>,
}

export type tComponentProps = tState & {
  save: () => void,
  session: ts.session<ts.user>,
  updateState: (
    key: tKeyUnion,
    value: string | boolean,
  ) => void,
}
