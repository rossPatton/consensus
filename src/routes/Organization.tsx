import loadable from '@loadable/component';

const OrganizationComponent = loadable(() =>
  import(/* webpackChunkName: "Organization" */'../pages/Organization')
);

export const Organization = {
  component: OrganizationComponent,
  exact: true,
  path: '/org/:id/:section/:page?',
};
