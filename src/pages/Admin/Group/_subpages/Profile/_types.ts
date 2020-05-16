export type tState = Partial<ts.group> & {
  avatarEmail: string,
  groupAvatar: string,
  password: string,
};
export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type tStore = {session: ts.thunk<ts.session>};
export type tKeyUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload,
  match: ts.adminSectionParams,
  patchOrgDispatch: (query: ts.groupQuery) => ts.thunkPayload<ts.group>,
  sessionThunk: ts.thunk<ts.session>,
};

export type tComponentProps = tState & {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  subsection: string
  session: ts.session<ts.group>,
  removeAvatar: any,
  setAvatar: any,
  updateState: (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => void,
};
