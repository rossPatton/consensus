export type tProps = {
  session: tSession,
};

export type tComponentProps = tProps & {
  logout: (ev: React.MouseEvent<HTMLButtonElement>) => void,
};

export type tContainerProps = tProps & {
  // wipes role relations on logout
  getRolesSuccess: (emptyRoles: []) => any,
  logout: () => tThunkReturn,
};
