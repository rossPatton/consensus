import { match } from 'react-router';

export interface tContainerProps {
  getOrgs: (query: {category: tCategory}) => tThunkReturn<tOrg[]>,
  isLoading: boolean,
  match: match & { params: tCategoryParams },
  orgs: tOrg[],
}

export type tStore = {
  orgs: tThunk<tOrg[]>,
};
