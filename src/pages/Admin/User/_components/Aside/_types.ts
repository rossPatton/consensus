export type tProps = {
  groupsByUserIdThunk: ts.thunk<ts.group[]>,
  roles: ts.roleMap[],
  session: ts.session<ts.user>,
};
