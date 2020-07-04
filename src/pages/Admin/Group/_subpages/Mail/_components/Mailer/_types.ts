export type tState = {
  content: string,
  error: string,
  subject: string,
};

export type tKeyUnion = keyof tState;

type tProps = {
  checked: {[key: number]: boolean},
  group: ts.group,
};

export type tComponentProps = tState & tProps & {
  sendEmail: (isTest?: boolean) => void,
  updateState: (key: tKeyUnion, value: string) => void,
};

export type tContainerProps = tProps & {
  usersByGroupIdThunk: ts.thunk<ts.user[]>,
};

export type tStore = {
  checked: {[key: number]: boolean},
  usersByGroupId: ts.thunk<ts.user[]>,
};
