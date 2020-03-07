import loadable from '@loadable/component';

export const CurrentProfile = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin CurrentProfile" */'./CurrentProfile'),
);

export const EditProfile = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin EditProfile" */'./EditProfile'),
);
