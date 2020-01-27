import * as H from 'history';
import qs from 'querystring';
import { match } from 'react-router-dom';

export interface tProps {
  getSearchResults: (searchObj: qs.ParsedUrlQuery) => Promise<tOrg[]>,
  isLoading: boolean,
  location: H.Location,
  match: match & {params: tSearchParams},
  search: tOrg[],
}

export type tStore = {
  search: tThunk<tOrg[]>,
};
