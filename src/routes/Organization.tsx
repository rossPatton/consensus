import loadable from '@loadable/component';
import React from 'react';

const OrganizationComponent = loadable(() =>
  import(/* webpackChunkName: "Organization" */'../pages/Organization'), {
  fallback: <div>Loading...</div>,
});

export const Organization = {
  component: OrganizationComponent,
  exact: true,
  path: '/org/:id/:section/:page?',
};
