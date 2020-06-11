export type tState = {
  content: string,
  email: string,
  emailSent: boolean,
  error: string | ts.fetchResponse<Error>,
  subject: string,
};

export type tKeyUnion = keyof tState;

export type tComponentProps = tState & {
  error: string | ts.fetchResponse<Error>,
  sendEmail: (email: string) => void,
  updateState: (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => void,
};
