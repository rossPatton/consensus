import loadable from '@loadable/component';

export const City = loadable(() =>
  import(/* webpackChunkName: "City" */'./City')
);

export const Country = loadable(() =>
  import(/* webpackChunkName: "Country" */'./Country')
);

export const Region = loadable(() =>
  import(/* webpackChunkName: "Region" */'./Region')
);
