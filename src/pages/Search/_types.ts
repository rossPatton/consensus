import * as H from 'history';
import qs from 'query-string';


export interface tProps {
  getSearchResults: (searchObj: qs.ParsedQuery) => Promise<ts.group[]>,
  location: H.Location,
  match: ts.match & {params: ts.searchParams},
  groupsBySearch: ts.thunk<ts.group[]>,
}

export type tStore = {
  groupsBySearch: ts.thunk<ts.group[]>,
};
