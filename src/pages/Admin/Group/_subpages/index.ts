import loadable from '@loadable/component';

export const Account = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin Account" */'./Account'),
);

export const DeleteGroup = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin DeleteGroup" */'./DeleteGroup'),
);

export const Meetings = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin Meetings" */'./Meetings'),
);

export const Members = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin Memberships" */'./Members'),
);

export const PlanMeeting = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin PlanMeeting" */'./PlanMeeting'),
);

export const Profile = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin Profile" */'./Profile'),
);
