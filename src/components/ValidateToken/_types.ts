import {History} from 'history';

export type tState = { error: string, token: string };
export type tKeyUnion = keyof tState;

export type tStore = {
  tokens: ts.thunk<boolean>,
};

export type tProps = {
  actionLabel: string,
  includeLegend?: boolean,
};

export type tContainerProps = tProps & {
  dispatch: Function,
  history: History,
  validateTokenDispatch: (query: {token: string}) => ts.thunkPayload<boolean>,
};

export type tComponentProps = tProps & tState & {
  actionLabel: string,
  updateState: (key: tKeyUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
  validateToken: () => void,
};
