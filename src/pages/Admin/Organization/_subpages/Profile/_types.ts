import {tAdminSections} from '../../../_types';

export type tState = Partial<tGroup> & {password: string};
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type tStore = {session: tThunk<tSession>};
export type tKeyUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (query: tLoginQuery) => tThunkPayload,
  match: tAdminSections,
  patchOrgDispatch: (query: tGroupQuery) => tThunkPayload<tGroup>,
  sessionThunk: tThunk<tSession>,
};

export type tComponentProps = tState & {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  subsection: string
  session: tSession,
  updateState: (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => void,
};
