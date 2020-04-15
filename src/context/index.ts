import loadable from '@loadable/component';

export const MatchMediaProvider = loadable(() =>
  import(/* webpackChunkName: "MatchMediaProvider" */'./MatchMediaProvider'),
);

export const SessionProvider = loadable(() =>
  import(/* webpackChunkName: "SessionProvider" */'./SessionProvider'),
);
