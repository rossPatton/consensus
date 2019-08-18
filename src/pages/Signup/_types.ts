export type tStore = {
  session: tThunk<tSession>,
};

export type tForm = {
  email: string,
  fname: string,
  lname: string,
  password: string,
  username: string,
};

export type tState = tForm & {
  error: string,
  showPW: boolean,
};

export type tContainerProps = {
  authenticateSession: (arg: tLogin) => { payload: tUser },
  insertUser: (arg: tForm) => Promise<{ payload: tSession }>,
  session: tSession,
};

export type tComponentProps = tContainerProps & tState & {
  register: (ev: React.FormEvent<HTMLFormElement>) => void,
  togglePWVisibility: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  updateEmail: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updatePassword: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updateUsername: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updateFname: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updateLname: (ev: React.ChangeEvent<HTMLInputElement>) => void,
};
