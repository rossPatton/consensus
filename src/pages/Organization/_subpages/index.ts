import loadable from '@loadable/component';

export const PlanMeeting = loadable(() =>
  import(/* webpackChunkName: "Plan Meeting" */'./PlanMeeting'),
);

export const Meetings = loadable(() =>
  import(/* webpackChunkName: "Group Meetings" */'./Meetings'),
);

export const Members = loadable(() =>
  import(/* webpackChunkName: "Group Members" */'./Members'),
);
