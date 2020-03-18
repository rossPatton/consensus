export type tState = {
  currentPassword: string,
  email: string,
  isLocked: boolean,
  isVerified: boolean,
  login: string,
  newPassword: string,
  privateEmail: boolean,
};

export type tKeyUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (login: tLoginQuery) => tThunkPayload<tSession>,
  patchAccountDispatch: (query: tAccountQuery) => tThunkPayload<tAccount>,
  sessionThunk: tThunk<tSession>,
};

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => Promise<void>,
  session: tSession,
  toggleLock: () => void,
  updateState: (key: tKeyUnion, value: string | boolean) => void,
};

export type tStore = {
  session: tThunk<tSession>,
};
