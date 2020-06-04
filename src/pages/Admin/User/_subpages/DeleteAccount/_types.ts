export type tState = {
  error: string,
};

export type tContainerProps = {
  deleteUserDispatch: (query: ts.idQuery) => ts.thunkPayload<ts.roleMap>,
  logoutDispatch: () => ts.thunkPayload<any>,
  sessionThunk: ts.thunk<ts.session>,
};

export type tComponentProps = tState & {
  deleteUser: () => void,
};
