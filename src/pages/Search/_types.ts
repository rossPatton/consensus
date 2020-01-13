import * as H from 'history';
import qs from 'querystring';

export type tProps = {
  getSearchResults: (searchObj: qs.ParsedUrlQuery) => Promise<any>,
  isLoading: boolean,
  location: H.Location,
  search: tOrg[],
};
