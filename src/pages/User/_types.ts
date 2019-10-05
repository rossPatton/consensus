import { match } from 'react-router';

export type tStore = {
  user: tThunk<tUser>,
  isLoading: boolean,
}

export type tProps = {
  getUserById: (query: tIdQuery) => Promise<any>,
  isLoading: boolean,
  match: match & { params: { id: number } },
  user: tUser,
};


