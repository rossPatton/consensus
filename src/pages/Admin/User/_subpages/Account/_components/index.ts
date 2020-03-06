import loadable from '@loadable/component';

export const CurrentAccount = loadable(() =>
  import(/* webpackChunkName: "UserAdmin CurrentAccount" */'./CurrentAccount'),
);

export const EditAccount = loadable(() =>
  import(/* webpackChunkName: "UserAdmin EditAccount" */'./EditAccount'),
);
