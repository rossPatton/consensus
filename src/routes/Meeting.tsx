import loadable from '@loadable/component';

const EventComponent = loadable(() =>
  import(/* webpackChunkName: "Meeting" */'~app/pages/Meeting'),
);

export const Meeting = {
  component: EventComponent,
  exact: true,
  path: '/meeting/:idOrSlug',
};
