import {History} from 'history';

export type tProps = {
  className?: string,
  getSearchResults: (query: {value: string}) => tThunkPayload<tGroup[]>,
  history: History,
};

export type tState = {
  key?: string,
  value?: string,
};
