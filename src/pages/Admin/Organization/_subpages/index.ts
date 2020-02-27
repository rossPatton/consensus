import loadable from '@loadable/component';

export const Account = loadable(() =>
  import(/* webpackChunkName: "OrgAdmin Account" */'./Account'),
);

export const Meetings = loadable(() =>
  import(/* webpackChunkName: "OrgAdmin Meetings" */'./Meetings'),
);

export const Members = loadable(() =>
  import(/* webpackChunkName: "OrgAdmin Memberships" */'./Members'),
);

export const PlanMeeting = loadable(() =>
  import(/* webpackChunkName: "OrgAdmin PlanMeeting" */'./PlanMeeting'),
);

export const Profile = loadable(() =>
  import(/* webpackChunkName: "OrgAdmin Profile" */'./Profile'),
);
