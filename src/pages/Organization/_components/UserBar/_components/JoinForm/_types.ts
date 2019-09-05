import {POST_USER_BY_ORG_SUCCESS} from '../../../../../../redux/async/usersByOrg/_types';

export type tUserAction = tAction<typeof POST_USER_BY_ORG_SUCCESS, tUser>;

export type tQuery = {id: string | number};

export type tProps = {
  postNewUserByOrg: (query: tQuery) => Promise<tUserAction>,
  role: tRole,
  session: tSession,
  setRole: (query: {role: tRole}) => any,
  setUserByOrg: (query: tUser) => any,
};

export type tComponentProps = {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
};

export type tStore = {
  usersByOrg: tThunk<tUser[]>,
}
