import { match } from 'react-router';

export type tContainerProps = {
  getGroups: (query: {category: tCategory}) => tThunkPayload<tGroup[]>,
  isLoading: boolean,
  match: match & { params: tCategoryParams },
  orgs: tThunk<tGroup[]>,
}

export type tStore = {
  orgs: tThunk<tGroup[]>,
};
