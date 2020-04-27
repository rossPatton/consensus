export type tState = Partial<tGroup> & {avatarEmail: string, password: string};
export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type tStore = {session: tThunk<ts.session>};
export type tKeyUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (query: ts.loginQuery) => tThunkPayload,
  match: ts.adminSectionParams,
  patchOrgDispatch: (query: tGroupQuery) => tThunkPayload<tGroup>,
  sessionThunk: tThunk<ts.session>,
};

export type tComponentProps = tState & {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  subsection: string
  session: ts.session,
  updateState: (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => void,
};
