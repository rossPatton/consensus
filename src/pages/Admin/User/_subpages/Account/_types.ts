import {PATCH_ACCOUNT_SUCCESS} from '../../../../../redux/async/account/_types';

export type tState = {
  login: string,
  newPassword: string,
  password: string,
};

export type tStateUnion = keyof tState;

export type tContainerProps = {
  authenticateSession: (login: tLogin) => any,
  patchAccount: (account: {id: number} & tState) =>
    Promise<tAction<typeof PATCH_ACCOUNT_SUCCESS, tAccount>>,
  session: tSession,
};

export type tComponentProps = tState & {
  save: (ev: React.FormEvent<HTMLFormElement>) => void,
  session: tSession,
  updateState: (key: tStateUnion, ev: React.ChangeEvent<HTMLInputElement>) => void,
};
