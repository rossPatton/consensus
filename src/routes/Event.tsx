import loadable from '@loadable/component';

const EventComponent = loadable(() =>
  import(/* webpackChunkName: "Event" */'~app/pages/Event'),
);

export const Event = {
  component: EventComponent,
  exact: true,
  path: '/event/:idOrSlug',
};
