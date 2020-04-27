export type tComponentProps = {
  logout: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  session: ts.session,
};

export type tContainerProps = {
  logoutDispatch: () => tThunkPayload,
  session: ts.session,
};
