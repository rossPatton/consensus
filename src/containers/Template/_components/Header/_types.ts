export type tComponentProps = {
  logout: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  session: tSession,
};

export type tContainerProps = {
  logoutDispatch: () => tThunkPayload,
  session: tSession,
};
