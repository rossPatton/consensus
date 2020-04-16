import loadable from '@loadable/component';

const DirectoryComponent = loadable(() =>
  import(/* webpackChunkName: "Directory" */'@app/pages/Directory'),
);

export const Directory = {
  component: DirectoryComponent,
  exact: true,
  path: '/directory/:countryCode/:regionCode?/:city?',
};
