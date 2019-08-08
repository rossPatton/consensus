export type tState = {
  email: string,
  fname: string,
  lname: string,
  password: string,
  username: string,
};

export type tStore = { session: tSession };

export type tContainerProps = {
  session: tSession,
  setActiveSession: (user: tSession) => any,
  // we get id from the active session
  updateUser: (user: tSession) => { payload: tUser },
};

export type tComponentProps = tState & {
  session: tSession,
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateEmail: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updatePassword: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updateUsername: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updateFname: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updateLname: (ev: React.ChangeEvent<HTMLInputElement>) => void,
};
