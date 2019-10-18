import loadable from '@loadable/component';

export const Account = loadable(() =>
  import(/* webpackChunkName: "OrgAdmin Account" */'./Account')
);

export const Decisions = loadable(() =>
  import(/* webpackChunkName: "OrgAdmin Devisions" */'./Decisions')
);

export const Events = loadable(() =>
  import(/* webpackChunkName: "OrgAdmin Events" */'./Events')
);

export const Members = loadable(() =>
  import(/* webpackChunkName: "OrgAdmin Memberships" */'./Members')
);

export const Profile = loadable(() =>
  import(/* webpackChunkName: "OrgAdmin Profile" */'./Profile')
);
