import loadable from '@loadable/component';

const DirectoryComponent = loadable(() =>
  import(/* webpackChunkName: "Directory" */'../pages/Directory'),
);

export const Directory = {
  component: DirectoryComponent,
  exact: true,
  path: '/directory/:country/:region?/:city?',
};
