export type tProps = {
  groupsByUserIdThunk: ts.thunk<ts.group[]>,
  isInvite: boolean,
  isRSVPs: boolean,
  roles: ts.roleMap[],
  session: ts.session<ts.user>,
};
