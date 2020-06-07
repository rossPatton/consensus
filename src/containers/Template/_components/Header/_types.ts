type tProps = {
  geo: ts.geo,
  session: ts.session,
};

export type tStore = {
  geo: ts.thunk<ts.geo>,
  session: ts.thunk<ts.session>,
};

export type tComponentProps = tProps & {
  logout: (ev: React.MouseEvent<HTMLButtonElement>) => void,
};

export type tContainerProps = tProps & {
  logoutDispatch: () => ts.thunkPayload,
};
