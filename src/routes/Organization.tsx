import loadable from '@loadable/component';

const OrganizationComponent = loadable(() =>
  import(/* webpackChunkName: "Organization" */'@app/pages/Organization'),
);

export const Organization = {
  component: OrganizationComponent,
  exact: true,
  // eslint-disable-next-line
  path: '/org/:idOrSlug/:section?',
};
