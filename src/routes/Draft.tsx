import loadable from '@loadable/component';

const DraftComponent = loadable(() =>
  import(/* webpackChunkName: "Draft" */'~app/pages/Draft'),
);

export const Draft = {
  component: DraftComponent,
  exact: true,
  path: '/draft/:id',
  private: true,
};
