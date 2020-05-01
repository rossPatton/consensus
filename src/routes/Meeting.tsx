import loadable from '@loadable/component';

const MeetingComponent = loadable(() =>
  import(/* webpackChunkName: "Meeting" */'~app/pages/Meeting'),
);

export const Meeting = {
  component: MeetingComponent,
  exact: true,
  path: '/meeting/:idOrSlug',
};
