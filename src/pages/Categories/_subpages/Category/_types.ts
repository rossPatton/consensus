import { match } from 'react-router';

export type tContainerProps = {
  getOrgs: (query: {category: tCategory}) => tThunkPayload<tOrg[]>,
  isLoading: boolean,
  match: match & { params: tCategoryParams },
  orgs: tThunk<tOrg[]>,
}

export type tStore = {
  orgs: tThunk<tOrg[]>,
};
