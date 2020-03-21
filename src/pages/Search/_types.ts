import * as H from 'history';
import qs from 'query-string';
import { match } from 'react-router-dom';

export interface tProps {
  getSearchResults: (searchObj: qs.ParsedQuery) => Promise<tGroup[]>,
  isLoading: boolean,
  location: H.Location,
  match: match & {params: tSearchParams},
  orgsBySearch: tGroup[],
}

export type tStore = {
  orgsBySearch: tThunk<tGroup[]>,
};
