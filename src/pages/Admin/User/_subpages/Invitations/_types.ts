export type tState = {
  hasMounted: boolean,
  username: string,
};

type tProps = {
  invitesThunk: ts.thunk<ts.userInvite[]>,
  session: ts.session,
};

export type tContainerProps = tProps & {
  dispatch: Function,
  deleteInviteDispatch: (query: ts.inviteQuery) => ts.thunkPayload<ts.userInvite>,
  getInvitesDispatch: (query: ts.inviteQuery) => ts.thunkPayload<ts.userInvite[]>, postNewUserByGroupIdDispatch: (query: ts.usersByGroupIdQuery) => ts.thunkPayload<ts.user>,
};

export type tComponentProps = tProps & tState & {
  acceptInvite: (ev: React.MouseEvent<HTMLButtonElement>, invite: ts.userInvite) => void,
  deleteInvite: (ev: React.MouseEvent<HTMLButtonElement>, invite: ts.userInvite) => void,
};

export type Store = {
  invites: ts.thunk<ts.userInvite[]>,
  session: ts.thunk<ts.session>,
};
