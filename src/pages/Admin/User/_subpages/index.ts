import loadable from '@loadable/component';

export const DeleteAccount = loadable(() =>
  import(/* webpackChunkName: "UserAdmin DeleteAccount" */'./DeleteAccount'),
);

export const Invitations = loadable(() =>
  import(/* webpackChunkName: "UserAdmin Invitations" */'./Invitations'),
);

export const Meetings = loadable(() =>
  import(/* webpackChunkName: "UserAdmin Meetings" */'./Meetings'),
);

export const Memberships = loadable(() =>
  import(/* webpackChunkName: "UserAdmin Memberships" */'./Memberships'),
);

export const Profile = loadable(() =>
  import(/* webpackChunkName: "UserAdmin Profile" */'./Profile'),
);

export const RSVPs = loadable(() =>
  import(/* webpackChunkName: "UserAdmin RSVPs" */'./RSVPs'),
);

// export const Security = loadable(() =>
//   import(/* webpackChunkName: "UserAdmin Security" */'./Security'),
// );
