import { match } from 'react-router';

export type tStore = {
  orgsByUserId: tThunk<tOrg[]>,
  user: tThunk<tUser>,
};

export type tProps = {
  match: match & { params: {id: string} },
  user: tUser,
};

export type tComponentProps = tProps & {
  orgs: tOrg[],
}

export type tContainerProps = tProps & {
  getOrgsByUserIdDispatch: (query: tOrgsByUserIdQuery) => tThunkPayload<tOrg[]>,
  getUserByIdDispatch: (query: tIdQuery) => tThunkPayload<tUser>,
  isLoading: boolean,
  orgsByUserId: tOrg[],
};


