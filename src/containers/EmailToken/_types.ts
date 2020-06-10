export type tState = {
  email: string,
  emailSent: boolean,
  error: string | ts.fetchResponse<Error>,
};

export type tKeyUnion = keyof tState;

export type tStore = {
  tokens: ts.thunk<{id: number, message: string}>,
};

type tProps = {
  actionLabel: string,
  legend?: React.ReactNode,
  tokensThunk: ts.thunk<{id: number, message: string}>,
};

export type tComponentProps = tProps & tState & {
  actionLabel: string,
  sendToken: () => void,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};

export type tContainerProps = tProps & {
  renderOnSend: (props: ts.tokenProps) => React.ReactNode,
  sendTokenDispatch: Function,
};
