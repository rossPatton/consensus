export type tState = {
  hasMounted: boolean,
  username: string,
};

export type tStateUnion = keyof tState;

type tProps = {
  invitesThunk: ts.thunk<ts.userInvite[]>,
  session: ts.session,
};

export type tContainerProps = tProps & {
  deleteInviteDispatch: (query: ts.inviteQuery) => ts.thunkPayload<ts.userInvite>,
  getInvitesDispatch: (query: ts.inviteQuery) => ts.thunkPayload<ts.userInvite[]>,
  postInviteDispatch: (query: ts.inviteQuery) => ts.thunkPayload<ts.userInvite>,
};

export type tComponentProps = tProps & tState & {
  deleteInvite: (ev: React.MouseEvent<HTMLButtonElement>, invite: ts.userInvite) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
  submit: (ev: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => void,
};

export type Store = {
  invites: ts.thunk<ts.userInvite[]>,
  session: ts.thunk<ts.session>,
};
