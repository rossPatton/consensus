export type tState = {
  isClient: boolean,
  email: string,
  login: string,
  password: string,
};

export type tStateUnion = keyof tState;

export type tComponentProps = tState & {
  resetPasswordByEmail: (event: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
