import loadable from '@loadable/component';

export const Announcer = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin Announcer" */'./Announcer'),
);

export const Mailer = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin Mailer" */'./Mailer'),
);
