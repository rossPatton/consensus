export type tProps = {
  session: tSession,
  authenticateSession: (arg: tLogin) => Promise<{payload: tUser}>,
  setActiveSession: (user: tUser) => Promise<tUser>,
};

export type tState = {
  email: string,
  fname: string,
  lname: string,
  password: string,
  username: string,
};

export type tComponentProps = tState & {
  login: (ev: React.FormEvent<HTMLFormElement>) => void,
  updateEmail: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updatePassword: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updateUsername: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updateFname: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  updateLname: (ev: React.ChangeEvent<HTMLInputElement>) => void,
}
