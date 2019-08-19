export type tState = {
  email: string,
  fname: string,
  lname: string,
  newPassword: string,
  password: string,
  username: string,
};

export type tStore = { session: tSession };
export type tStateUnion = keyof tState;

export type tContainerProps = {
  session: tSession,
  // we get id from the active session
  updateUser: (user: tSession) => { type: string, payload: tUser },
};

export type tComponentProps = tState & {
  session: tSession,
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
