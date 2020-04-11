export type tProps = {
  isDesktop: boolean,
  isMobile: boolean,
  orgsByUserIdThunk: tThunk<tGroup[]>,
  roles: tRoleMap[],
  session: tSession<tUser>,
};
