import loadable from '@loadable/component';

export const NoMatchComponent = loadable(() =>
  import(/* webpackChunkName: "NoMatch" */'@app/pages/404'),
);

export const NoMatch = {
  component: NoMatchComponent,
  path: '*',
};
