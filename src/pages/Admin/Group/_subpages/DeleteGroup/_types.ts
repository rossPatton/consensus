export type tState = {
  error: string,
};

export type tContainerProps = {
  deleteGroupDispatch: () => ts.thunkPayload<ts.session>,
  logoutDispatch: () => ts.thunkPayload<any>,
  session: ts.session,
};

export type tComponentProps = tState & {
  deleteGroup: () => void,
  session: ts.session,
};
