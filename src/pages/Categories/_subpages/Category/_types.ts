import { match } from 'react-router';

export interface tContainerProps {
  getOrgs: (params: {category: tCategory}) => tThunk<tOrg[]>,
  isLoading: boolean,
  match: match & { params: tCategoryParams },
  orgs: tOrg[],
}

export type tStore = {
  orgs: tThunk<tOrg[]>,
};
