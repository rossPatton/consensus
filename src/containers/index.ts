import loadable from '@loadable/component';

export const AppShell = loadable(() =>
  import(/* webpackChunkName: "AppShell" */'./AppShell'),
);

export const EmailToken = loadable(() =>
  import(/* webpackChunkName: "EmailToken" */'./EmailToken'),
);

export const ErrorBoundary = loadable(() =>
  import(/* webpackChunkName: "ErrorBoundary" */'./ErrorBoundary'),
);

export const GenericLoader = loadable(() =>
  import(/* webpackChunkName: "GenericLoader" */'./GenericLoader'),
);

export const OutsideClick = loadable(() =>
  import(/* webpackChunkName: "OutsideClick" */'./OutsideClick'),
);

export const Paginate = loadable(() =>
  import(/* webpackChunkName: "Paginate" */'./Paginate'),
);

export const PublishedFilter = loadable(() =>
  import(/* webpackChunkName: "PublishedFilter" */'./PublishedFilter'),
);

export const RoleFilter = loadable(() =>
  import(/* webpackChunkName: "RoleFilter" */'./RoleFilter'),
);

export const SearchFilter = loadable(() =>
  import(/* webpackChunkName: "SearchFilter" */'./SearchFilter'),
);

export const Template = loadable(() =>
  import(/* webpackChunkName: "Template" */'./Template'),
);
