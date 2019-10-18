import loadable from '@loadable/component';

export const OrganizationHeader = loadable(() =>
  import(/* webpackChunkName: "OrganizationHeader" */'./OrganizationHeader')
);

export const OrganizationTabs = loadable(() =>
  import(/* webpackChunkName: "OrganizationTabs" */'./OrganizationTabs')
);

export const UserBar = loadable(() =>
  import(/* webpackChunkName: "Org UserBar" */'./UserBar')
);
