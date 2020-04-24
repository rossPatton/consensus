import { match } from 'react-router';

export type tContainerProps = {
  getGroups: (query: {category: tCategory}) => tThunkPayload<tGroup[]>,
  isLoading: boolean,
  match: match & { params: tCategoryParams },
  group: tThunk<tGroup[]>,
}

export type tStore = {
  group: tThunk<tGroup[]>,
};
