export type tState = {
  isClient: boolean,
  email: string,
};

export type tStateUnion = keyof tState;

export type tComponentProps = tState & {
  sendPasswordResetEmail: (event: React.FormEvent<HTMLFormElement>) => void,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
}
