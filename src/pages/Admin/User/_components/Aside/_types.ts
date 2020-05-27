export type tProps = {
  groupsByUserIdThunk: ts.thunk<ts.group[]>,
  isInvite: boolean,
  roles: ts.roleMap[],
  session: ts.session<ts.user>,
};
