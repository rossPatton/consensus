import * as H from 'history';

export interface tProps {
  getSearchResults: (searchObj: ts.searchQuery) => Promise<ts.group[]>,
  location: H.Location,
  match: ts.match & {params: ts.searchParams},
  groupsBySearch: ts.thunk<ts.group[]>,
}

export type tStore = {
  groupsBySearch: ts.thunk<ts.group[]>,
};
