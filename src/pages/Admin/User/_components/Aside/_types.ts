export type tProps = {
  isDesktop: boolean,
  isMobile: boolean,
  groupsByUserIdThunk: ts.thunk<ts.group[]>,
  roles: ts.roleMap[],
  session: ts.session<ts.user>,
};
