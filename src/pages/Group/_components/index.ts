import loadable from '@loadable/component';

export const JoinForm = loadable(() =>
  import(/* webpackChunkName: "JoinForm" */'./JoinForm'),
);

export const LeaveForm = loadable(() =>
  import(/* webpackChunkName: "LeaveForm" */'./LeaveForm'),
);

export const GroupInfo = loadable(() =>
  import(/* webpackChunkName: "GroupInfo" */'./GroupInfo'),
);

export const GroupTabs = loadable(() =>
  import(/* webpackChunkName: "GroupTabs" */'./GroupTabs'),
);
