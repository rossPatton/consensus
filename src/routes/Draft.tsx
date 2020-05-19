import loadable from '@loadable/component';

const DraftComponent = loadable(() =>
  import(/* webpackChunkName: "Meeting Page Draft Route" */'~app/pages/Meeting'),
);

export const Draft = {
  component: DraftComponent,
  exact: true,
  path: '/draft/:idOrSlug',
  private: true,
  redirect: '/login',
};
