export type tState = {
  hasMounted: boolean,
  currentPassword: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  loginDispatch: (query: tLoginQuery) => tThunkPayload<tSession>,
  patchAccountDispatch: (query: tAccountQuery) => tThunkPayload<tSession>,
  sessionThunk: tThunk<tSession>,
};

export type tComponentProps = tState & {
  deleteGroup: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
  session: tSession,
};
