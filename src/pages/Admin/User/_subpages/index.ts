import loadable from '@loadable/component';

export const Account = loadable(() =>
  import(/* webpackChunkName: "UserAdmin Account" */'./Account'),
);

export const Events = loadable(() =>
  import(/* webpackChunkName: "UserAdmin Events" */'./Events'),
);

export const Memberships = loadable(() =>
  import(/* webpackChunkName: "UserAdmin Memberships" */'./Memberships'),
);

export const Profile = loadable(() =>
  import(/* webpackChunkName: "UserAdmin Profile" */'./Profile'),
);
