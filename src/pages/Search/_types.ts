import * as H from 'history';
import qs from 'query-string';
import { match } from 'react-router-dom';

export interface tProps {
  getSearchResults: (searchObj: qs.ParsedQuery) => Promise<tOrg[]>,
  isLoading: boolean,
  location: H.Location,
  match: match & {params: tSearchParams},
  search: tOrg[],
}

export type tStore = {
  search: tThunk<tOrg[]>,
};
