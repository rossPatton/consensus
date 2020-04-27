export type tComponentProps = {
  logout: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  session: ts.session,
};

export type tContainerProps = {
  logoutDispatch: () => ts.thunkPayload,
  session: ts.session,
};
