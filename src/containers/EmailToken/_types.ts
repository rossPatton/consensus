export type tState = {
  email: string,
  emailSent: boolean,
  error: string | ts.fetchResponse<Error>,
};

export type tKeyUnion = keyof tState;

export type tStore = {
  tokens: ts.thunk<boolean>,
};

type tProps = {
  actionLabel: string,
  legend?: React.ReactNode,
};

export type tComponentProps = tProps & tState & {
  actionLabel: string,
  sendToken: () => void,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};

export type tContainerProps = tProps & {
  renderOnSend: (email: string) => React.ReactNode,
  sendTokenDispatch: Function,
};
