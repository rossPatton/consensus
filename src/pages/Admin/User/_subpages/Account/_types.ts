export type tState = {
  isVerified: boolean,
  login: string,
  newPassword: string,
  password: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  login: (login: tLogin) => tThunkReturn<tSession>,
  patchAccount: (account: {id: number} & tState) => tThunkReturn<tAccount>,
  session: tSession,
};

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: tSession,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
