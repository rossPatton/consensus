import loadable from '@loadable/component';

export const CreateOrEditEvent = loadable(() =>
  import(/* webpackChunkName: "CreateOrEditEvent" */'./CreateOrEditEvent')
);

export const Decisions = loadable(() =>
  import(/* webpackChunkName: "Org Decisions" */'./Decisions')
);

export const Events = loadable(() =>
  import(/* webpackChunkName: "Org Events" */'./Events')
);

export const Overview = loadable(() =>
  import(/* webpackChunkName: "Org Overview" */'./Overview')
);
