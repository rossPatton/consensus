import {History} from 'history';
import {RouteComponentProps} from 'react-router';

export type tProps = RouteComponentProps<any> & {
  className?: string,
  getSearchResults: (query: {value: string}) => tThunkPayload<tGroup[]>,
  history: History,
};

export type tState = {
  key?: string,
  value?: string,
};
