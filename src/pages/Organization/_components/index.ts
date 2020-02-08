import loadable from '@loadable/component';

export const OrganizationInfo = loadable(() =>
  import(/* webpackChunkName: "OrganizationInfo" */'./OrganizationInfo'),
);

export const OrganizationTabs = loadable(() =>
  import(/* webpackChunkName: "OrganizationTabs" */'./OrganizationTabs'),
);

export const UserBar = loadable(() =>
  import(/* webpackChunkName: "Org UserBar" */'./UserBar'),
);
