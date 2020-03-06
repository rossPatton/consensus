import loadable from '@loadable/component';

export const CurrentProfile = loadable(() =>
  import(/* webpackChunkName: "UserAdmin CurrentProfile" */'./CurrentProfile'),
);

export const EditProfile = loadable(() =>
  import(/* webpackChunkName: "UserAdmin EditProfile" */'./EditProfile'),
);
