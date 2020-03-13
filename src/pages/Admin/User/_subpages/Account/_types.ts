export type tState = {
  email: string,
  isLocked: boolean,
  isVerified: boolean,
  login: string,
  newPassword: string,
  currentPassword: string,
};

export type tStateUnion = keyof tState;

export type tStore = {
  session: tThunk<tSession>,
};

export type tContainerProps = {
  loginDispatch: (login: tLoginQuery) => tThunkPayload<tSession>,
  patchAccountDispatch: (query: tAccountQuery) => tThunkPayload<tAccount>,
  sessionThunk: tThunk<tSession>,
};

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: tSession,
  toggleLock: () => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
