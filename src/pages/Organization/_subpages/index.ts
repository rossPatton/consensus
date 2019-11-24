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

export const MakeDecision = loadable(() =>
  import(/* webpackChunkName: "Org MakeDecision" */'./MakeDecision')
);

export const Members = loadable(() =>
  import(/* webpackChunkName: "Org Members" */'./Members')
);

export const Overview = loadable(() =>
  import(/* webpackChunkName: "Org Overview" */'./Overview')
);
