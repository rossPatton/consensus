import { match } from 'react-router';

export type tStore = {
  groupsByUserId: tThunk<tGroup[]>,
  user: tThunk<tUser>,
};

export type tProps = {
  match: match & { params: {id: string} },
  user: tUser,
};

export type tComponentProps = tProps & {
  groups: tGroup[],
}

export type tContainerProps = tProps & {
  getGroupsByUserIdDispatch: (query: tGroupsByUserIdQuery) => tThunkPayload<tGroup[]>,
  getUserByIdDispatch: (query: tIdQuery) => tThunkPayload<tUser>,
  isLoading: boolean,
  groupsByUserId: tGroup[],
};


