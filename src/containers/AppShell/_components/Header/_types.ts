export type tProps = {
  session: tSession,
  toggleNav: () => void,
};

export type tComponentProps = tProps & {
  logout: (ev: React.MouseEvent<HTMLButtonElement>) => void,
};

export type tContainerProps = tProps & {
  // wipe role relations on logout
  getRolesSuccess: (emptyRoles: []) => any,
  logOutOfSession: () => any,
};
