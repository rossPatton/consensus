export type tStore = {
  session: tSession,
}

export type tState = {
  email: string,
  fname: string,
  lname: string,
  password: string,
  username: string,
};

export type tContainerProps = {
  authenticateSession: (arg: tLogin) => { payload: tUser },
  insertUser: (arg: tState) => Promise<{ payload: tSession }>,
  setActiveSession: (user: tUser) => any,
  session: tSession,
};

export type tComponentProps = tContainerProps & tState & {
  register: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateEmail: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updatePassword: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updateUsername: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updateFname: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updateLname: (ev: React.ChangeEvent<HTMLInputElement>) => void,
};
