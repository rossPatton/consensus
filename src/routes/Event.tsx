import loadable from '@loadable/component';

const EventComponent = loadable(() =>
  import(/* webpackChunkName: "Event" */'../pages/Event')
);

export const Event = {
  component: EventComponent,
  exact: true,
  path: '/event/:id',
};
