import loadable from '@loadable/component';

export const MatchMediaProvider = loadable(() =>
  import(/* webpackChunkName: "MatchMediaProvider" */'./MatchMediaProvider'),
);
