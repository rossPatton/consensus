import loadable from '@loadable/component';

export const JoinForm = loadable(() =>
  import(/* webpackChunkName: "JoinForm" */'./JoinForm'),
);

export const LeaveForm = loadable(() =>
  import(/* webpackChunkName: "LeaveForm" */'./LeaveForm'),
);

export const OrganizationInfo = loadable(() =>
  import(/* webpackChunkName: "OrganizationInfo" */'./OrganizationInfo'),
);

export const OrganizationTabs = loadable(() =>
  import(/* webpackChunkName: "OrganizationTabs" */'./OrganizationTabs'),
);
