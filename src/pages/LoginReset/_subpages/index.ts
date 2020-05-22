import loadable from '@loadable/component';

export const EmailTokenComponent = loadable(() =>
  import(/* webpackChunkName: "Reset Login EmailToken" */'./EmailToken'),
);

export const ResetLoginComponent = loadable(() =>
  import(/* webpackChunkName: "ResetLoginComponent" */'./ResetLogin'),
);
