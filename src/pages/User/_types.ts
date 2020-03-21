import { match } from 'react-router';

export type tStore = {
  orgsByUserId: tThunk<tGroup[]>,
  user: tThunk<tUser>,
};

export type tProps = {
  match: match & { params: {id: string} },
  user: tUser,
};

export type tComponentProps = tProps & {
  orgs: tGroup[],
}

export type tContainerProps = tProps & {
  getGroupsByUserIdDispatch: (query: tGroupsByUserIdQuery) => tThunkPayload<tGroup[]>,
  getUserByIdDispatch: (query: tIdQuery) => tThunkPayload<tUser>,
  isLoading: boolean,
  orgsByUserId: tGroup[],
};


