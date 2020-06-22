import {History} from 'history';

export type tState = Partial<ts.group> & {error: string};
export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type tKeyUnion = keyof tState;

export type tStore = {
  session: ts.thunk<ts.session<ts.group>>,
  uploads: ts.thunk<ts.upload>,
};

export type tContainerProps = {
  avatar?: string,
  dispatch: Function,
  history: History,
  match: ts.adminSectionParams,
  patchGroupDispatch: (query: ts.groupUpsertQuery) => ts.thunkPayload<ts.group>,
  sessionThunk: ts.thunk<ts.session<ts.group>>,
};

export type tComponentProps = tState & {
  onSubmit: (token: string) => void,
  subsection: string
  session: ts.session<ts.group>,
  updateState: (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => void,
};
