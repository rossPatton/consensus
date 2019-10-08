export type tProps = {
  session: tSession,
  toggleNav: () => void,
};

export type tComponentProps = tProps & {
  logout: (ev: React.MouseEvent<HTMLButtonElement>) => void,
};

export type tContainerProps = tProps & {
  logOutOfSession: () => void,
};
