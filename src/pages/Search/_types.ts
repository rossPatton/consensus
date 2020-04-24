import * as H from 'history';
import qs from 'query-string';
import { match } from 'react-router-dom';

export interface tProps {
  getSearchResults: (searchObj: qs.ParsedQuery) => Promise<tGroup[]>,
  location: H.Location,
  match: match & {params: tSearchParams},
  groupsBySearch: tThunk<tGroup[]>,
}

export type tStore = {
  groupsBySearch: tThunk<tGroup[]>,
};
