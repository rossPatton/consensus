export type tState = {
  hasMounted: boolean,
  username: string,
  // currentPassword: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  postInviteDispatch: (query: ts.inviteQuery) => ts.thunkPayload<ts.userInvite>,
  session: ts.session,
};

export type tComponentProps = tState & {
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
  session: ts.session,
  submit: (ev: React.FormEvent<HTMLInputElement>) => void,
};
