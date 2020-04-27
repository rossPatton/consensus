export type tProps = {
  isDesktop: boolean,
  isMobile: boolean,
  groupsByUserIdThunk: tThunk<tGroup[]>,
  roles: ts.roleMap[],
  session: ts.session<tUser>,
};
