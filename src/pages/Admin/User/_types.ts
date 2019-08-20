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
  authenticateSession: (login: tLogin) => any,
  // we get id from the active session
  updateUser: (user: tSession) => any,
};

export type tComponentProps = tState & {
  session: tSession,
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
