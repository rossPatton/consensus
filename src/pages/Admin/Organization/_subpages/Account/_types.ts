export type tState = {
  isVerified: boolean,
  login: string,
  newPassword: string,
  password: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  login: (query: tLoginQuery) => tThunkPayload,
  patchAccount: (query: tAccount) => tThunkPayload,
  session: tSession,
};

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: tSession,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
