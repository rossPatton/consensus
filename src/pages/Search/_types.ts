import * as H from 'history';
import qs from 'querystring';

export interface tProps {
  getSearchResults: (searchObj: qs.ParsedUrlQuery) => Promise<any>,
  isLoading: boolean,
  location: H.Location,
  search: tOrg[],
}

export type tStore = {
  search: tThunk<tOrg[]>,
};
