import {History} from 'history';
import {RouteComponentProps} from 'react-router';

export type tProps = RouteComponentProps<any> & {
  className?: string,
  getSearchResultsDispatch: (query: ts.searchQuery) => ts.thunkPayload<ts.group[]>,
  history: History,
  placeholder?: string,
};

export type tState = {
  key?: ts.searchKeyUnion,
  value?: string,
};
