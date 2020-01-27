export type tState = {
  isVerified: boolean,
  login: string,
  newPassword: string,
  password: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  login: (login: tLoginQuery) => tThunkPayload<tSession>,
  patchAccount: (account: {id: number} & tState) => tThunkPayload<tAccount>,
  session: tSession,
};

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: tSession,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
