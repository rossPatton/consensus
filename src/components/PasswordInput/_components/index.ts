import loadable from '@loadable/component';

export const StrengthMeter = loadable(() =>
  import(/* webpackChunkName: "StrengthMeter" */'./StrengthMeter'),
);
