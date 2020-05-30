export type tState = Partial<ts.group> & {
  password: string,
};
export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type tKeyUnion = keyof tState;

export type tStore = {
  session: ts.thunk<ts.session>,
  uploads: ts.thunk<ts.upload>,
};

export type tContainerProps = {
  avatar?: string,
  loginDispatch: (query: ts.loginQuery) => ts.thunkPayload,
  match: ts.adminSectionParams,
  patchAccountDispatch: (query: ts.accountQuery) => ts.thunkPayload<ts.account>,
  patchGroupDispatch: (query: ts.groupUpsertQuery) => ts.thunkPayload<ts.group>,
  sessionThunk: ts.thunk<ts.session>,
};

export type tComponentProps = tState & {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  subsection: string
  session: ts.session<ts.group>,
  updateState: (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => void,
};
