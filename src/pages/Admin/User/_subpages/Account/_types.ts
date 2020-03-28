import {tAdminSections} from '../../../_types';

export type tState = {
  currentPassword: string,
  email: string,
  isVerified: boolean,
  login: string,
  newPassword: string,
  privateEmail: boolean,
};

export type tKeyUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (login: tLoginQuery) => tThunkPayload<tSession>,
  match: tAdminSections,
  patchAccountDispatch: (query: tAccountQuery) => tThunkPayload<tAccount>,
  sessionThunk: tThunk<tSession>,
};

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => Promise<void>,
  session: tSession,
  subsection: string,
  updateState: (key: tKeyUnion, value: string | boolean) => void,
};

export type tStore = {
  session: tThunk<tSession>,
};
