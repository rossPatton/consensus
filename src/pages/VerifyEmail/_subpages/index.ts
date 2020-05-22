import loadable from '@loadable/component';

export const EmailTokenComponent = loadable(() =>
  import(/* webpackChunkName: "EmailTokenComponent" */'./EmailToken'),
);

export const VerifyTokenComponent = loadable(() =>
  import(/* webpackChunkName: "VerifyTokenComponent" */'./VerifyToken'),
);
