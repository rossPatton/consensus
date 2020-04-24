export type tProps = {
  isDesktop: boolean,
  isMobile: boolean,
  groupsByUserIdThunk: tThunk<tGroup[]>,
  roles: tRoleMap[],
  session: tSession<tUser>,
};
