export type tComponentProps = {
  isAuthenticated: boolean,
  logout: (ev: React.MouseEvent<HTMLButtonElement>) => void,
};

export type tContainerProps = {
  logoutDispatch: () => tThunkPayload,
  session: tSession,
};
