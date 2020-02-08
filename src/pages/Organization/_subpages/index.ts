import loadable from '@loadable/component';

export const CreateOrEditEvent = loadable(() =>
  import(/* webpackChunkName: "CreateOrEditEvent" */'./CreateOrEditEvent'),
);

export const Events = loadable(() =>
  import(/* webpackChunkName: "Org Events" */'./Events'),
);

export const Members = loadable(() =>
  import(/* webpackChunkName: "Org Members" */'./Members'),
);
