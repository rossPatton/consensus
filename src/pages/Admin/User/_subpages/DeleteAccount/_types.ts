export type tState = {
  error: string,
};

export type tContainerProps = {
  deleteUserDispatch: () => ts.thunkPayload<{ok: true}>,
  logoutDispatch: () => ts.thunkPayload<any>,
  sessionThunk: ts.thunk<ts.session>,
};

export type tComponentProps = tState & {
  deleteUser: () => void,
};
