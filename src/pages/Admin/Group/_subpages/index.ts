import loadable from '@loadable/component';

export const DeleteGroup = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin DeleteGroup" */'./DeleteGroup'),
);

export const InviteMember = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin InviteMember" */'./InviteMember'),
);

export const Mail = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin Mail" */'./Mail'),
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
