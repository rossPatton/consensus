export type tState = Partial<ts.group> & {error: string};
export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type tKeyUnion = keyof tState;

export type tStore = {
  session: ts.thunk<ts.session>,
  uploads: ts.thunk<ts.upload>,
};

export type tContainerProps = {
  avatar?: string,
  dispatch: Function,
  match: ts.adminSectionParams,
  patchGroupDispatch: (query: ts.groupUpsertQuery) => ts.thunkPayload<ts.group>,
  sessionThunk: ts.thunk<ts.session>,
};

export type tComponentProps = tState & {
  onSubmit: (token: string) => void,
  subsection: string
  session: ts.session<ts.group>,
  updateState: (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => void,
};
