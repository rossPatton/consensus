import loadable from '@loadable/component';

const SearchComponent = loadable(() =>
  import(/* webpackChunkName: "Search" */'~app/pages/Search'),
);

export const Search = {
  component: SearchComponent,
  path: '/search',
};
